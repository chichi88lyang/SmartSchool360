const teacherDocument = require("../models/teacherDocument");

// ✅ Create or Update Teacher Document Checklist
exports.updateChecklist = async (req, res) => {
  const { year, term, updates } = req.body;

  try {
    let checklist = await teacherDocument.findOne({
      teacher: req.user.id,
      year,
      term,
    });

    if (!checklist) {
      checklist = new teacherDocument({
        teacher: req.user.id,
        year,
        term,
      });
    }

    Object.assign(checklist, updates);
    checklist.lastUpdated = new Date();

    await checklist.save();

    res.status(200).json({ message: "Checklist updated", checklist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Checklist + Auto-Generated Comment
exports.getChecklistSummary = async (req, res) => {
  const { year, term } = req.query;

  try {
    const checklist = await teacherDocument.findOne({
      teacher: req.user.id,
      year,
      term,
    }).populate("teacher", "name email");

    if (!checklist) {
      return res.status(404).json({ message: "Checklist not found" });
    }
    
    const totalChecks = [
      checklist.syllabus,
      checklist.workPlan,
      checklist.schemesOfWork,
      checklist.timetable,
      checklist.markingKeysSubmitted,
      checklist.progressChartUpdated,
      checklist.resultAnalysisSubmitted,
      checklist.observationInstrumentsSubmitted,
      checklist.testsGiven?.week5,
      checklist.testsGiven?.week10,
      checklist.testsGiven?.endOfTerm,
    ];

    const completed = totalChecks.filter(Boolean).length;
    const score = (completed / totalChecks.length) * 100;

    let autoComment = "";

    if (score >= 80) {
      autoComment = "Excellent compliance with documentation requirements.";
    } else if (score >= 50) {
      autoComment = "Good progress. Please ensure remaining documents are submitted on time.";
    } else {
      autoComment = "Documentation compliance is below expectations. Immediate improvement needed.";
    }

    res.status(200).json({
      checklist,
      autoComment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Generate Printable Summary for Teacher Documents
exports.printChecklist = async (req, res) => {
  const { year, term } = req.query;

  try {
    const checklist = await teacherDocument.findOne({
      teacher: req.user.id,
      year,
      term,
    }).populate("teacher", "name email");

    if (!checklist) {
      return res.status(404).json({ message: "Checklist not found" });
    }

    const report = {
      Teacher: checklist.teacher.name,
      Email: checklist.teacher.email,
      Year: checklist.year,
      Term: checklist.term,
      Documents: {
        Syllabus: checklist.syllabus ? "✅ Submitted" : "❌ Missing",
        WorkPlan: checklist.workPlan ? "✅ Submitted" : "❌ Missing",
        SchemesOfWork: checklist.schemesOfWork ? "✅ Submitted" : "❌ Missing",
        Timetable: checklist.timetable ? "✅ Ready" : "❌ Missing",
        LessonPlansPrepared: `${checklist.lessonPlansPrepared || 0} of ${checklist.totalExpectedLessons || 0}`,
        RecordOfWorkSubmittedWeeks: checklist.recordOfWorkSubmittedWeeks || [],
        HomeworkGiven: checklist.homeworkGiven || [],
        Tests: {
          Week5: checklist.testsGiven?.week5 ? "✅ Given" : "❌ Missing",
          Week10: checklist.testsGiven?.week10 ? "✅ Given" : "❌ Missing",
          EndOfTerm: checklist.testsGiven?.endOfTerm ? "✅ Given" : "❌ Missing",
        },
        MarkingKeysSubmitted: checklist.markingKeysSubmitted ? "✅ Submitted" : "❌ Missing",
        ProgressChartUpdated: checklist.progressChartUpdated ? "✅ Updated" : "❌ Missing",
        ResultAnalysisSubmitted: checklist.resultAnalysisSubmitted ? "✅ Submitted" : "❌ Missing",
        ObservationInstrumentsSubmitted: checklist.observationInstrumentsSubmitted ? "✅ Submitted" : "❌ Missing",
      },
      LastUpdated: checklist.lastUpdated,
    };

    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
