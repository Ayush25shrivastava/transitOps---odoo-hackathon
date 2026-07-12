require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");



connectDB();

const app = express();


app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use(limiter);


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));


app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "TransitOps API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 TransitOps Server running on port ${PORT}`);
  console.log(`   Environment : ${process.env.NODE_ENV || "development"}`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;