const mongoose = require("mongoose");

const teacherDocumentSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  year: String,
  term: String,
  syllabus: Boolean,
  workPlan: Boolean,
  schemesOfWork: Boolean,
  timetable: Boolean,
  lessonPlansPrepared: Number,
  totalExpectedLessons: Number,
  recordOfWorkSubmittedWeeks: [Number],
  homeworkGiven: Number,
  testsGiven: {
    week5: Boolean,
    week10: Boolean,
    endOfTerm: Boolean,
  },
  markingKeysSubmitted: Boolean,
  progressChartUpdated: Boolean,
  resultAnalysisSubmitted: Boolean,
  observationInstrumentsSubmitted: Boolean,
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TeacherDocument", teacherDocumentSchema);
