import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gray-800 text-white shadow-2xl rounded-lg animate-fade-in">
      
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">
        About ResumePort
      </h1>

      {/* Introduction */}
      <p className="mt-6 text-lg text-white text-center leading-relaxed">
        Welcome to <span className="font-bold text-blue-400">ResumePort</span>, your all-in-one platform for creating professional resumes and stunning portfolios.  
        Whether you're a job seeker, freelancer, or creative professional, we've got you covered!
      </p>

      {/* Mission Section */}
      <div className="mt-8 p-6 bg-gray-700 rounded-lg shadow-inner">
        <h2 className="text-2xl font-bold text-center text-green-400">Our Mission</h2>
        <p className="mt-3 text-white text-center">
          Our goal is to empower individuals by providing easy-to-use tools that help them showcase their skills, experience, and achievements effectively.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center text-blue-400">Why Choose Us?</h2>
        <ul className="mt-4 space-y-3 text-white text-lg text-center">
          <li>✅ User-Friendly Interface – Simple and easy to navigate.</li>
          <li>✅ Modern Resume Templates – Tailor-made for success.</li>
          <li>✅ Customizable Portfolios – Showcase your work beautifully.</li>
          <li>✅ Fast & Secure – Built with speed and privacy in mind.</li>
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-10 text-center">
        <p className="text-white text-lg">Start building your resume or portfolio today!</p>
        <a
          href="/signup"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg text-lg font-semibold 
          hover:bg-blue-700 transition transform hover:scale-105"
        >
          Get Started
        </a>
      </div>

    </div>
  );
};

export default AboutUs;
