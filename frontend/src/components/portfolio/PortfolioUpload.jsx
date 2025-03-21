import React, { useState } from "react";

const PortfolioUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    // Handle file upload logic (e.g., send to backend)
    console.log("Uploading:", file.name);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Upload Portfolio</h2>
      <input type="file" onChange={handleFileChange} className="border p-2 my-2 w-full" />
      <button onClick={handleUpload} className="bg-blue-600 text-white p-2 mt-4">
        Upload Portfolio
      </button>
    </div>
  );
};

export default PortfolioUpload;
