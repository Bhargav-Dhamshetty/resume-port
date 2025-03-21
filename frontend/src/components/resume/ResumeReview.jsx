import React, { useEffect, useState } from "react";

const ResumeReview = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch("/api/resume", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setResume(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (!resume) {
    return <p className="text-center text-lg">No resume found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Resume Details</h2>
      <p>
        <strong>Name:</strong> {resume.fullName}
      </p>
      <p>
        <strong>Email:</strong> {resume.email}
      </p>
      <p>
        <strong>Phone:</strong> {resume.phone}
      </p>
      <p>
        <strong>LinkedIn:</strong> <a href={resume.linkedin} className="text-blue-600">{resume.linkedin}</a>
      </p>
      <p>
        <strong>GitHub:</strong> <a href={resume.github} className="text-blue-600">{resume.github}</a>
      </p>
      <p>
        <strong>Website:</strong> <a href={resume.website} className="text-blue-600">{resume.website}</a>
      </p>
      <p className="mt-2">
        <strong>Summary:</strong> {resume.summary}
      </p>

      <h3 className="text-xl font-bold mt-4">Skills</h3>
      <ul className="list-disc ml-6">
        {resume.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h3 className="text-xl font-bold mt-4">Experience</h3>
      {resume.experience.map((exp, index) => (
        <div key={index} className="mt-2 p-3 border rounded">
          <p><strong>Company:</strong> {exp.company}</p>
          <p><strong>Role:</strong> {exp.role}</p>
          <p><strong>Duration:</strong> {exp.startDate} - {exp.endDate || "Present"}</p>
          <p>{exp.description}</p>
        </div>
      ))}

      <h3 className="text-xl font-bold mt-4">Education</h3>
      {resume.education.map((edu, index) => (
        <div key={index} className="mt-2 p-3 border rounded">
          <p><strong>Institution:</strong> {edu.institution}</p>
          <p><strong>Degree:</strong> {edu.degree}</p>
          <p><strong>Duration:</strong> {edu.startDate} - {edu.endDate}</p>
        </div>
      ))}
    </div>
  );
};

export default ResumeReview;
