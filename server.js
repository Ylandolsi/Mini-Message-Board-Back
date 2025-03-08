const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { setupDatabase } = require("./db/queries");

// Set environment variables
const isProduction = process.env.NODE_ENV === "production";
console.log(`Running in ${isProduction ? "production" : "development"} mode`);

// Configure CORS based on environment
const corsOptions = {
  origin: isProduction
    ? process.env.ALLOWED_ORIGINS || "*" // In production, use configured origins or allow all
    : "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// Add better error handling for database initialization
async function startServer() {
  console.log(`Running in ${process.env.NODE_ENV} mode`);

  try {
    // Initialize the database
    await setupDatabase(); // Your database setup function
    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Failed to initialize database:", err);
    // Continue running the server even if database fails
    // This allows the server to start and display API documentation
  }

  // Global error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: isProduction ? "Internal Server Error" : err.message,
      ...(isProduction ? {} : { stack: err.stack }),
    });
  });

  try {
    const messageRoutes = require("./routes/messageRoutes");
    app.use("/api/messages", messageRoutes);
    console.log("Routes registered at /api/messages");
  } catch (err) {
    console.error("Failed to load routes:", err);
  }

  // Only include admin routes in development or if explicitly enabled
  try {
    const adminRoutes = require("./routes/adminRoutes");
    app.use("/api/admin", adminRoutes);
    console.log("Admin routes registered at /api/admin");
  } catch (err) {
    console.error("Failed to load admin routes:", err);
  }

  // Health check endpoint for Koyeb
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Test endpoint
  app.get("/test", (req, res) => {
    res.json({ message: "Server is working!" });
  });

  // Handle 404 - Keep this as the last route
  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
