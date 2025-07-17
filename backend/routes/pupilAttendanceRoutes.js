const express = require("express");
const { markAttendance, getAttendanceSummary } = require("../controllers/pupilAttendanceController");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ POST: Mark Attendance (Protected)
router.post("/:id/attendance", auth(), markAttendance);

// ✅ GET: Attendance Summary (Protected)
router.get("/attendance-summary", auth(), getAttendanceSummary);

module.exports = router;
