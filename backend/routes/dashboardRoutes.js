const express = require("express");
const { getChecklistDashboard, getAttendanceDashboard } = require("../controllers/dashboardController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/checklist-summary", auth(), getChecklistDashboard);
router.get("/attendance-summary", auth(), getAttendanceDashboard);

module.exports = router;
