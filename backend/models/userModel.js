import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true, // Clerk's unique user ID
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String, // Stores Clerk profile image URL
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Define roles for authorization
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;