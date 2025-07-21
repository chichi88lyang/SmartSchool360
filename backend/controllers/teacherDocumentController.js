const TeacherDocument = require("../models/TeacherDocument");
const User = require("../models/User");

// ✅ Get Checklist Summary for all teachers with auto-comments
exports.getChecklistSummary = async (req, res) => {
  const { year, term } = req.query;

  try {
    const records = await TeacherDocument.find({ year, term }).populate("teacher", "name email grade");

    if (!records.length) {
      return res.status(404).json({ message: "No records found for this term/year." });
    }

    const summary = records.map(doc => {
      let comment = "Satisfactory";

      if (!doc.syllabus || !doc.workPlan || !doc.schemesOfWork) {
        comment = "Key documents missing";
      } else if (doc.lessonPlansPrepared < (doc.totalExpectedLessons * 0.75)) {
        comment = "Lesson plans below expected";
      } else if (!doc.resultAnalysisSubmitted) {
        comment = "Result analysis not submitted";
      }

      return {
        teacher: doc.teacher.name,
        email: doc.teacher.email,
        grade: doc.teacher.grade,
        term: doc.term,
        year: doc.year,
        syllabus: doc.syllabus,
        workPlan: doc.workPlan,
        schemesOfWork: doc.schemesOfWork,
        lessonPlansPrepared: doc.lessonPlansPrepared,
        totalExpectedLessons: doc.totalExpectedLessons,
        recordOfWorkSubmittedWeeks: doc.recordOfWorkSubmittedWeeks,
        homeworkGiven: doc.homeworkGiven,
        testsGiven: doc.testsGiven,
        markingKeysSubmitted: doc.markingKeysSubmitted,
        progressChartUpdated: doc.progressChartUpdated,
        resultAnalysisSubmitted: doc.resultAnalysisSubmitted,
        observationInstrumentsSubmitted: doc.observationInstrumentsSubmitted,
        lastUpdated: doc.lastUpdated,
        comment
      };
    });

    res.status(200).json({ term, year, summary });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
