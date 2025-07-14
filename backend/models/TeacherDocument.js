const mongoose = require("mongoose");

const teacherDocumentSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  year: { type: Number, required: true },
  term: { type: String, enum: ["Term 1", "Term 2", "Term 3"], required: true },

  syllabus: { type: Boolean, default: false },
  workPlan: { type: Boolean, default: false },
  schemesOfWork: { type: Boolean, default: false },
  timetable: { type: Boolean, default: false },

  lessonPlansPrepared: { type: Number, default: 0 },
  totalExpectedLessons: { type: Number, default: 0 },

  recordOfWorkSubmittedWeeks: { type: Number, default: 0 },
  homeworkGiven: { type: Number, default: 0 },

  testsGiven: {
    week5: { type: Boolean, default: false },
    week10: { type: Boolean, default: false },
    endOfTerm: { type: Boolean, default: false },
  },

  markingKeysSubmitted: { type: Boolean, default: false },
  progressChartUpdated: { type: Boolean, default: false },
  resultAnalysisSubmitted: { type: Boolean, default: false },
  observationInstrumentsSubmitted: { type: Boolean, default: false },

  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("TeacherDocument", teacherDocumentSchema);
