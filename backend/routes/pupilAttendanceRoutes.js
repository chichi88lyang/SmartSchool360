const express = require("express");
const { getAttendanceSummary } = require("../controllers/pupilAttendanceController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/attendance-summary", auth(), getAttendanceSummary);

module.exports = router;
