import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";


const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-6 mt-12 shadow-lg">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        
        {/* Logo and Name */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
          ResumePort
        </h1>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link to="/aboutus" className="hover:text-blue-400 transition duration-300">About Us</Link>
          <Link to="/contactus" className="hover:text-green-400 transition duration-300">Contact Us</Link>
          <Link to="/" className="hover:text-yellow-400 transition duration-300">Privacy Policy</Link>
          <Link to="/" className="hover:text-red-400 transition duration-300">Terms of Service</Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:scale-110 transition">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:scale-110 transition">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:scale-110 transition">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:scale-110 transition">
            <i className="fab fa-github"></i>
          </a>
        </div>

        {/* Copyright Text */}
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ResumePort. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
