import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";

const Header = () => {
  const location = useLocation();
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const [text, setText] = useState("");
  const fullText = "ResumePort";
  const speed = 100; // Speed of typewriter effect

  // Typewriter Effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        setTimeout(() => {
          index = 0;
          setText("");
        }, 1000); // Pause before restart
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-blue-200 text-white p-4 flex justify-between items-center shadow-lg transition-all duration-300">
      {/* Typewriter Effect with Gradient Animation */}
      <a
        href={"/"}
        className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-transparent bg-clip-text animate-pulse"
      >
        {text}
      </a>

      {/* Authentication Buttons & Home (At Last) */}
      <div className="flex space-x-4">
        {isSignedIn ? (
          <>
            <button
              onClick={() => {
                signOut();
                localStorage.removeItem("clerkAuthToken"); // Remove token on logout
              }}
              className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>

            {/* Profile Image & Name */}
            <div className="flex items-center space-x-2">
              <img src={user?.imageUrl} alt="Profile" className="w-8 h-8 rounded-full" />
              <span className="text-white font-medium">{user?.firstName}</span>
            </div>
          </>
        ) : (
          <div className="flex space-x-2">
            <Link
              to="/signin"
              className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-700 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-yellow-500 px-4 py-2 rounded-md text-white hover:bg-yellow-600 transition duration-300"
            >
              Signup
            </Link>
          </div>
        )}

        {/* Home Button (Fixed at the Last) */}
        <Link
          to="/"
          className={`px-4 py-2 rounded-md transition duration-300 ${
            isActive("/") ? "bg-white text-black" : "text-white hover:bg-white hover:text-black"
          }`}
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Header;
