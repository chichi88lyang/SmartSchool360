const express = require("express");
const { getChecklistSummary, exportChecklist } = require("../controllers/teacherDocumentController");
const auth = require("../middleware/auth");
//
const router = express.Router();
//
router.get("/summary", auth(), getChecklistSummary);
router.get("/export", auth(), exportChecklist);

module.exports = router;
