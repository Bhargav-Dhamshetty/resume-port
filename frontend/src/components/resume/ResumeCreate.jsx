import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResumeCreate = () => {
  const navigate = useNavigate();
  const [resume, setResume] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
    skills: [""],
    experience: [{ company: "", role: "", startDate: "", endDate: "", description: "" }],
    education: [{ institution: "", degree: "", startDate: "", endDate: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedResume, setGeneratedResume] = useState(null);

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, field, value, section) => {
    const updatedSection = [...resume[section]];
    updatedSection[index][field] = value;
    setResume({ ...resume, [section]: updatedSection });
  };

  const addField = (section, emptyObj) => {
    setResume({ ...resume, [section]: [...resume[section], emptyObj] });
  };

  const removeField = (section, index) => {
    const updatedSection = [...resume[section]];
    updatedSection.splice(index, 1);
    setResume({ ...resume, [section]: updatedSection });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:9000/resume-api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok && data.resume?.text) {
        setGeneratedResume(data.resume.text);
      } else {
        throw new Error(data.message || "Failed to generate resume. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error("❌ Error generating resume:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-6">
      <div className="p-8 bg-gray-100 rounded-xl shadow-2xl w-full max-w-3xl">
        {!generatedResume ? (
          <>
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
               Create Your Professional Resume
            </h2>

            {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                required
                className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleChange}
                required
                className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="phone"
                placeholder="Phone"
                type="tel"
                onChange={handleChange}
                required
                className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="linkedin"
                placeholder="LinkedIn Profile"
                onChange={handleChange}
                className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="github"
                placeholder="GitHub Profile"
                onChange={handleChange}
                className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="website"
                placeholder="Portfolio Website"
                onChange={handleChange}
                className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="summary"
                placeholder="Add here projects & skills & info..."
                onChange={handleChange}
                className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <button
                type="submit"
                className="bg-green-600 text-white p-3 rounded-lg w-full font-semibold shadow-lg hover:bg-green-700 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Resume"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-left bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-3xl font-extrabold text-green-600 mb-4">✅ Resume Generated Successfully!</h2>
            <pre className="whitespace-pre-wrap text-gray-800 text-lg border p-4 rounded-lg bg-gray-100">
              {generatedResume}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(generatedResume)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition mx-4"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={() => setGeneratedResume(null)}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-900 transition mx-5"
            >
              Generate Another Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeCreate;
