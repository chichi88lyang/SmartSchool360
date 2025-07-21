const express = require("express");

const auth = require("../middleware/auth");
const { getChecklistSummary } = require("../controllers/teacherDocumentController");

const router = express.Router();

// ✅ Checklist Summary Route
router.get("/summary", auth(), getChecklistSummary);
//
module.exports = router;
