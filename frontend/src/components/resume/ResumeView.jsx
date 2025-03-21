import React, { useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ResumeView = () => {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle File Selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFeedback(null);
    setAtsScore(null);
    setError(null);
  };

  // Handle Resume Upload & AI Feedback
  const handleUpload = async () => {
    if (!file) {
      setError("❌ Please select a resume file first!");
      return;
    }
  
    const formData = new FormData();
    formData.append("resumeFile", file);
  
    try {
      setLoading(true);
      setFeedback(null);
      setAtsScore(null);
      setError(null);
  
      // Send file to backend
      const response = await axios.post(
        "http://localhost:9000/resume-api/ats-score",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
  
      console.log("🛠 Backend Response:", response.data);
  
      if (!response.data || !response.data.atsAnalysis) {
        throw new Error("❌ ATS analysis data is missing.");
      }
  
      const { atsAnalysis } = response.data;
  
      // ✅ Updated regex to match both formats of "ATS Score:"
      const scoreMatch = atsAnalysis.match(/ATS Score:\**\s*(\d+)/i);
      const extractedScore = scoreMatch ? parseInt(scoreMatch[1], 10) : null;
  
      if (extractedScore === null) {
        throw new Error("❌ No ATS score found in the response.");
      }
  
      setAtsScore(extractedScore);
      setFeedback(formatFeedback(atsAnalysis));
    } catch (error) {
      console.error("❌ Upload Error:", error);
      setError(error.response?.data?.message || error.message || "⚠️ Unexpected error occurred. Please try again!");
    } finally {
      setLoading(false);
    }
  };
  

  // Format AI Feedback Properly
  const formatFeedback = (text) => {
    return text
      .replace(/\*\*/g, "") // Remove unwanted bold formatting
      .split("\n\n")
      .map((section, index) => {
        return <p key={index} className="text-gray-700">{section}</p>;
      });
  };

  // Function to determine color based on ATS score
  const getAtsColor = (score) => {
    if (score >= 75) return "#4CAF50"; // Green
    if (score >= 50) return "#FFC107"; // Yellow
    return "#F44336"; // Red
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📂 Upload Resume</h2>

      {/* File Input */}
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full border p-3 rounded-md focus:ring focus:ring-blue-300"
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-5 w-full p-4 rounded-md text-white transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "⏳ Uploading..." : "🚀 Upload & Analyze"}
      </button>

      {/* ATS Score Display - Circular Progress Bar */}
      {atsScore !== null && (
        <div className="mt-6 flex justify-center items-center">
          <div style={{ width: 120, height: 120 }}>
            <CircularProgressbar
              value={atsScore}
              text={`${atsScore}/100`}
              styles={buildStyles({
                textSize: "16px",
                pathColor: getAtsColor(atsScore),
                textColor: "#333",
                trailColor: "#ddd",
                strokeLinecap: "round",
                transition: "stroke-dashoffset 0.6s ease-in-out",
              })}
            />
          </div>
        </div>
      )}

      {/* Display Feedback */}
      {feedback && (
        <div className="mt-6 p-5 border rounded-md bg-green-100 text-green-800">
          <h3 className="font-semibold text-lg text-yellow-600">📊 AI Feedback:</h3>
          {feedback}
        </div>
      )}

      {/* Display Error Messages */}
      {error && (
        <div className="mt-6 p-5 border rounded-md bg-red-100 text-red-800">
          <h3 className="font-semibold text-lg">❌ Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeView;
