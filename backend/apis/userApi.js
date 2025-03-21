const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const clerkAuthMiddleware = require("../middlewares/clerkAuth");

const userApp = express.Router();

// 📌 Get User Profile
userApp.get(
  "/profile",
  clerkAuthMiddleware,
  expressAsyncHandler(async (req, res) => {
    try {
      console.log("🔹 Fetching user profile for Clerk ID:", req.auth.userId);
      const user = await User.findOne({ clerkId: req.auth.userId });

      if (!user) {
        console.log("❌ User not found in DB");
        return res.status(404).json({ success: false, message: "User not found" });
      }

      console.log("✅ User profile fetched successfully:", user);
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
      res.status(500).json({ success: false, message: "Error fetching user data", error });
    }
  })
);

// 📌 Create or Update User in DB (Runs on First Login)
userApp.post(
  "/login",
  clerkAuthMiddleware,
  expressAsyncHandler(async (req, res) => {
    try {
      console.log("🔹 Clerk Auth Data:", req.auth);
      
      const { userId, firstName, lastName, email, imageUrl } = req.auth;

      if (!userId || !email) {
        console.log("❌ Missing required fields!");
        return res.status(400).json({ success: false, message: "Invalid authentication data" });
      }

      let user = await User.findOne({ clerkId: userId });

      if (!user) {
        console.log("🆕 Creating new user...");
        user = new User({ clerkId: userId, firstName, lastName, email, profileImage: imageUrl });
        await user.save();
        console.log("✅ User saved in MongoDB:", user);
      } else {
        console.log("✅ User already exists:", user);
      }

      res.status(200).json({ success: true, message: "User authenticated", user });
    } catch (error) {
      console.error("❌ Error in /login:", error);
      res.status(500).json({ success: false, message: "Error processing request", error });
    }
  })
);

// 📌 Delete User Account
userApp.delete(
  "/",
  clerkAuthMiddleware,
  expressAsyncHandler(async (req, res) => {
    try {
      console.log("🔹 Deleting user with Clerk ID:", req.auth.userId);
      const user = await User.findOneAndDelete({ clerkId: req.auth.userId });

      if (!user) {
        console.log("❌ User not found for deletion");
        return res.status(404).json({ success: false, message: "User not found" });
      }

      console.log("✅ User deleted successfully from MongoDB");
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      res.status(500).json({ success: false, message: "Error deleting user", error });
    }
  })
);

module.exports = userApp;
