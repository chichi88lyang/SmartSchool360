const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for file access (optional)
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/pupils", require("./routes/pupilRoutes"));
app.use("/api/teacher-docs", require("./routes/teacherDocumentRoutes"));

// Test route
app.get("/", (req, res) => res.send("API running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
