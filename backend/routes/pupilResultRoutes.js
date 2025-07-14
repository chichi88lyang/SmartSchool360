const express = require("express");
const { submitResult } = require("../controllers/pupilResultController");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Submit result (protected)
router.post("/submit", auth(), submitResult);

module.exports = router;
