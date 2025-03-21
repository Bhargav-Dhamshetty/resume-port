import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; // ✅ Import useUser to check authentication

const ContactUs = () => {
  const { user } = useUser(); // ✅ Get user details correctly
  const [formData, setFormData] = useState({
    name: user?.fullName || "",  // ✅ Auto-fill name if user is logged in
    email: user?.primaryEmailAddress?.emailAddress || "", // ✅ Auto-fill email
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    
    try {
      await emailjs.send(
        "service_z91jh6k", // Replace with your EmailJS Service ID
        "template_wr9v235", // Replace with your EmailJS Template ID
        {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        "oZhA3P1T4lUTc9Uv0" // Replace with your EmailJS Public Key
      );

      setSuccess("✅ Message sent successfully!");
      setFormData({ ...formData, message: "" }); // ✅ Clear only the message field
    } catch (error) {
      console.error("Email sending failed:", error);
      setSuccess("❌ Failed to send message. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-gray-900 text-white shadow-2xl rounded-lg animate-fade-in">
      
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-green-300 text-transparent bg-clip-text">
        Contact Us
      </h1>

      {/* If User is Not Logged In */}
      {!user ? (
        <div className="text-center mt-6">
          <p className="text-lg text-gray-300">Please log in to send us a message.</p>
          <Link
            to="/signin"
            className="mt-4 inline-block bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      ) : (
        <>
          {success && (
            <p className={`mt-4 text-center font-semibold text-lg ${success.includes("✅") ? "text-green-400" : "text-red-400"} animate-fade-in`}>
              {success}
            </p>
          )}

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block text-gray-300">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-300">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-300">Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold p-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactUs;
