const express = require("express");
const {
  registerPupil,
  markAttendance,
  getAttendanceSummary
} = require("../controllers/pupilController");

const router = express.Router();

router.post("/register", registerPupil);
router.post("/:id/attendance", markAttendance);
router.get("/:id/attendance-summary", getAttendanceSummary); // ✅ You just added this

module.exports = router;
