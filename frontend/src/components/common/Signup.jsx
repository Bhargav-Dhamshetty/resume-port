import React, { useEffect } from "react";
import { SignUp, useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  // Send user data to the backend after signup
  useEffect(() => {
    const sendUserDataToBackend = async () => {
      if (!isSignedIn || !user) return;

      try {
        const userData = {
          clerkId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.primaryEmailAddress?.emailAddress,
          profileImage: user.imageUrl,
        };

        console.log("🔹 Sending new user data to backend:", userData);

        const response = await fetch("http://localhost:9000/user-api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          console.log("✅ Signup data stored successfully!");
          navigate("/"); // Redirect to home
        } else {
          console.error("❌ Signup failed:", await response.json());
        }
      } catch (error) {
        console.error("❌ Error sending signup data:", error);
      }
    };

    sendUserDataToBackend();
  }, [isSignedIn, user, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp />
    </div>
  );
};

export default Signup;
