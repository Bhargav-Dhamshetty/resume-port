const { requireAuth } = require("@clerk/express");

// Middleware to protect routes
const clerkAuthMiddleware = requireAuth({
  onError: (req, res) => {
    return res.status(401).json({ error: "Unauthorized Access - Please log in" });
  },
});

module.exports = clerkAuthMiddleware;