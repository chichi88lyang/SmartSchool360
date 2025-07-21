const express = require("express");
const { markAttendance, getAttendanceSummary } = require("../controllers/pupilAttendanceController");
const auth = require("../middleware/auth");  // Assuming you use auth middleware
const router = express.Router();
// ✅ GET: Attendance Summary (Protected)
router.post("/:id/attendance", auth(), markAttendance);


router.get("/attendance-summary", auth(), getAttendanceSummary);

module.exports = router;
