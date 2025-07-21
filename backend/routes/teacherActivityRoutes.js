const express = require("express");
const { logActivity, getLogs } = require("../controllers/teacherActivityController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/log", auth(), logActivity);
router.get("/logs", auth(), getLogs);

module.exports = router;
