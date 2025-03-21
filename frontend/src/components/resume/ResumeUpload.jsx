import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Handle File Selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFeedback(null);
    setError(null);
  };

  // ✅ Handle Resume Upload & AI Feedback
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
      setError(null);

      // 📌 Send File to Backend for AI Processing
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/resume-api/analyze`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setFeedback(formatFeedback(response.data.analysis));
    } catch (error) {
      console.error("❌ Upload Error:", error);
      if (error.response) {
        setError(`⚠️ Server Error (${error.response.status}): ${error.response.data?.message || "Something went wrong!"}`);
      } else if (error.request) {
        setError("⚠️ No response from server. Check if the backend is running.");
      } else {
        setError("⚠️ Unexpected error occurred. Please try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Format AI Feedback Properly with Gold-Colored Headings
  const formatFeedback = (text) => {
    return text.split("\n\n").map((section, index) => {
      if (section.startsWith("# ")) {
        return (
          <h2 key={index} className="text-lg font-bold text-yellow-600 mt-4">
            {section.replace("# ", "")}
          </h2>
        );
      } else if (section.startsWith("**")) {
        return (
          <h3 key={index} className="text-md font-semibold text-yellow-500 mt-3">
            {section.replace(/\*\*/g, "")}
          </h3>
        );
      } else if (section.startsWith("*")) {
        return (
          <ul key={index} className="list-disc list-inside text-gray-700 ml-5">
            <li>{section.replace("* ", "")}</li>
          </ul>
        );
      } else {
        return (
          <p key={index} className="text-gray-700">
            {section}
          </p>
        );
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📂 Upload Resume</h2>

      {/* 📌 File Input */}
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full border p-3 rounded-md focus:ring focus:ring-blue-300"
      />

      {/* 📌 Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-5 w-full p-4 rounded-md text-white transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "⏳ Uploading..." : " Upload & Analyze"}
      </button>

      {/* 📌 Display Feedback */}
      {feedback && (
        <div className="mt-6 p-5 border rounded-md bg-green-100 text-green-800">
          <h3 className="font-semibold text-lg text-yellow-600">📊 AI Feedback:</h3>
          {feedback}
        </div>
      )}

      {/* 📌 Display Error Messages */}
      {error && (
        <div className="mt-6 p-5 border rounded-md bg-red-100 text-red-800">
          <h3 className="font-semibold text-lg">❌ Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
