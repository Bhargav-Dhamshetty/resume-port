import React, { useEffect } from "react";
import { SignIn, useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const sendUserDataToBackend = async () => {
      if (isSignedIn && user) {
        try {
          const token = await getToken();
          console.log("🔹 Clerk Auth Token:", token);

          const userData = {
            clerkId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.primaryEmailAddress?.emailAddress,
            profileImage: user.imageUrl,
          };

          console.log("🔹 Sending user data:", userData);

          const response = await fetch("http://localhost:9000/user-api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
          });

          const result = await response.json();
          console.log("✅ Backend Response:", result);

          if (response.ok) {
            navigate("/");
          } else {
            console.error("❌ Login failed:", result.message);
          }
        } catch (error) {
          console.error("❌ Error sending user data:", error);
        }
      }
    };

    sendUserDataToBackend();
  }, [isSignedIn, user, getToken, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
};

export default Login;
