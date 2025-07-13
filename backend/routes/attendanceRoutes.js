const express = require("express");
const {
  logLogin,
  logLogout,
  approveAttendance,
  getAllAttendanceRecords
} = require("../controllers/attendanceController");

const auth = require("../middleware/auth"); // Middleware to check token and roles

const router = express.Router();

// ✅ Teacher logs in → attendance marked (loginTime)
router.post("/login", auth(), logLogin);

// ✅ Teacher logs out → logoutTime recorded
router.post("/logout", auth(), logLogout);

// ✅ Admin approves a teacher's attendance for a specific day
router.post("/approve", auth(true), approveAttendance);

// ✅ Admin dashboard: View all teacher attendance records
router.get("/all", auth(true), getAllAttendanceRecords);

module.exports = router;
