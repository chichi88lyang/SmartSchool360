const express = require("express");
const {
  updateChecklist,
  getChecklistSummary,
  printChecklist
} = require("../controllers/teacherDocumentController");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Update checklist (protected)
router.post("/update", auth(), updateChecklist);

// ✅ Get checklist summary with auto-comment (protected)
router.get("/summary", auth(), getChecklistSummary);

// ✅ Get printable checklist summary (protected)
router.get("/print", auth(), printChecklist);

module.exports = router;
