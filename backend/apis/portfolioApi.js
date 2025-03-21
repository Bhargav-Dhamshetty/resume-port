const exp = require("express");
const expressAsyncHandler = require("express-async-handler");
const portfolioApp = exp.Router();
const Portfolio = require("../models/portfolioModel");
const fs = require("fs-extra");
const path = require("path");
const PDFDocument = require("pdfkit");

// Import Gemini services for portfolio functionalities
const { generatePortfolio, analyzePortfolio, reviewPortfolio } = require("../utils/geminiServices");

// 📌 Ensure directory for storing generated PDFs
const OUTPUT_DIR = path.join(__dirname, "../generated_pdfs");
fs.ensureDirSync(OUTPUT_DIR);

// 📌 Function to generate and save a portfolio as a PDF
const generatePDF = (text, filename) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(OUTPUT_DIR, filename);
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    doc.fontSize(14).text(text, { align: "left" });
    doc.end();

    stream.on("finish", () => resolve(`/generated_pdfs/${filename}`));
    stream.on("error", (err) => reject(err));
  });
};

/* ---------------------------------------------
📌 Create or Update Portfolio (Authenticated User)
--------------------------------------------- */
portfolioApp.post(
  "/portpost",
  expressAsyncHandler(async (req, res) => {
    try {
      const { userId } = req.auth || {};
      const { title, description, projects, skills, website } = req.body;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User not authenticated" });
      }
      if (!title || !description || !projects || !skills) {
        return res.status(400).json({ message: "Missing required fields: Title, Description, Projects, or Skills." });
      }

      let portfolio = await Portfolio.findOne({ clerkId: userId });

      if (portfolio) {
        Object.assign(portfolio, req.body);
      } else {
        portfolio = new Portfolio({ clerkId: userId, ...req.body });
      }

      await portfolio.save();
      res.status(200).json({ message: "Portfolio saved successfully", portfolio });
    } catch (error) {
      console.error("❌ Error saving portfolio:", error);
      res.status(500).json({ message: "Error saving portfolio", error: error.message });
    }
  })
);

/* ---------------------------------------------
📌 Get Portfolio Data (Authenticated User)
--------------------------------------------- */
portfolioApp.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const portfolio = await Portfolio.findOne({ clerkId: req.auth.userId });
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      res.status(200).json(portfolio);
    } catch (error) {
      console.error("❌ Error fetching portfolio:", error);
      res.status(500).json({ message: "Error fetching portfolio", error: error.message });
    }
  })
);

/* ---------------------------------------------
📌 Delete Portfolio (Authenticated User)
--------------------------------------------- */
portfolioApp.delete(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const portfolio = await Portfolio.findOneAndDelete({ clerkId: req.auth.userId });
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      res.status(200).json({ message: "Portfolio deleted successfully" });
    } catch (error) {
      console.error("❌ Error deleting portfolio:", error);
      res.status(500).json({ message: "Error deleting portfolio", error: error.message });
    }
  })
);

/* ---------------------------------------------
📌 Generate Portfolio using Gemini AI
--------------------------------------------- */
portfolioApp.post("/portfolio-api/generate", async (req, res) => {
  try {
    const portfolioData = req.body;
    if (!portfolioData) {
      return res.status(400).json({ message: "Invalid portfolio data" });
    }

    // Save portfolio logic (assuming MongoDB)
    const newPortfolio = new Portfolio(portfolioData);
    await newPortfolio.save();

    res.status(201).json({ message: "Portfolio created successfully", portfolio: newPortfolio });
  } catch (error) {
    console.error("Error saving portfolio:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



/* ---------------------------------------------
📌 Analyze Portfolio with Gemini AI
--------------------------------------------- */
portfolioApp.post(
  "/analyze",
  expressAsyncHandler(async (req, res) => {
    try {
      const { portfolioText } = req.body;
      if (!portfolioText) {
        return res.status(400).json({ message: "Portfolio text is required." });
      }

      console.log("🔍 Analyzing Portfolio...");
      const analysis = await analyzePortfolio(portfolioText);

      res.status(200).json({ message: "Portfolio analysis complete", analysis });
    } catch (error) {
      console.error("❌ Error analyzing portfolio:", error);
      res.status(500).json({ message: "Error analyzing portfolio", error: error.message });
    }
  })
);

/* ---------------------------------------------
📌 Review Portfolio with AI
--------------------------------------------- */
portfolioApp.post(
  "/review",
  expressAsyncHandler(async (req, res) => {
    try {
      const { portfolioText } = req.body;
      if (!portfolioText) {
        return res.status(400).json({ message: "Portfolio text is required." });
      }

      console.log("🔍 Reviewing Portfolio...");
      const review = await reviewPortfolio(portfolioText);

      res.status(200).json({ message: "Portfolio review complete", review });
    } catch (error) {
      console.error("❌ Error reviewing portfolio:", error);
      res.status(500).json({ message: "Error reviewing portfolio", error: error.message });
    }
  })
);

module.exports = portfolioApp;