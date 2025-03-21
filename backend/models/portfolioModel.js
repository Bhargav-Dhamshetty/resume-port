import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User", 
    },
    fullName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String, // URL for profile picture
    },
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        projectLink: { type: String },
        repoLink: { type: String },
        technologies: [{ type: String }], // List of tech stack used
      },
    ],
    experience: [
      {
        company: { type: String, required: true },
        role: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
      },
    ],
    skills: [{ type: String }], // Array of skills
    contact: {
      email: { type: String, required: true },
      phone: { type: String },
      linkedin: { type: String },
      github: { type: String },
      website: { type: String },
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
export default Portfolio;