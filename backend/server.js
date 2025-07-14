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

// ✅ Route Files
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const pupilRoutes = require("./routes/pupilRoutes");
const teacherDocumentRoutes = require("./routes/teacherDocumentRoutes");
const pupilAttendanceRoutes = require("./routes/pupilAttendanceRoutes");

// ✅ Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/pupils", pupilRoutes);
app.use("/api/pupils", pupilAttendanceRoutes); // share base path with pupilRoutes
app.use("/api/teacher-docs", teacherDocumentRoutes); // teacher documents routes mounted here

// Test route
app.get("/", (req, res) => res.send("API running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
