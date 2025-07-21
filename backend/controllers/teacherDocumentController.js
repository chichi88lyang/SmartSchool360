const TeacherDocument = require("../models/TeacherDocument");
const User = require("../models/User");
const { Parser } = require("json2csv");

// ✅ Get Checklist Summary with Auto Comment
exports.getChecklistSummary = async (req, res) => {
  const { term, year } = req.query;

  try {
    const documents = await TeacherDocument.find({ term, year }).populate("teacher", "name email");

    if (!documents.length) {
      return res.status(404).json({ message: "No documents found." });
    }

    const summary = documents.map(doc => {
      const missing = [];
      if (!doc.syllabus) missing.push("Syllabus");
      if (!doc.workPlan) missing.push("Work Plan");
      if (!doc.schemesOfWork) missing.push("Schemes of Work");
      if (!doc.timetable) missing.push("Timetable");
      if (doc.lessonPlansPrepared < doc.totalExpectedLessons) missing.push("Lesson Plans");
      if (!doc.markingKeysSubmitted) missing.push("Marking Keys");
      if (!doc.progressChartUpdated) missing.push("Progress Chart");
      if (!doc.resultAnalysisSubmitted) missing.push("Result Analysis");
      if (!doc.observationInstrumentsSubmitted) missing.push("Observation Instruments");

      const comment = missing.length ? `Missing: ${missing.join(", ")}` : "All submitted";

      return {
        teacher: doc.teacher ? doc.teacher.name : "Unknown",
        email: doc.teacher ? doc.teacher.email : "Unknown",
        term: doc.term,
        year: doc.year,
        syllabus: doc.syllabus,
        workPlan: doc.workPlan,
        schemesOfWork: doc.schemesOfWork,
        timetable: doc.timetable,
        lessonPlansPrepared: doc.lessonPlansPrepared,
        totalExpectedLessons: doc.totalExpectedLessons,
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

    res.json({ summary });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Export Checklist Summary as CSV
exports.exportChecklist = async (req, res) => {
  const { term, year } = req.query;

  try {
    const documents = await TeacherDocument.find({ term, year }).populate("teacher", "name email");

    if (!documents.length) {
      return res.status(404).json({ message: "No documents found." });
    }

    const data = documents.map(doc => {
      const missing = [];
      if (!doc.syllabus) missing.push("Syllabus");
      if (!doc.workPlan) missing.push("Work Plan");
      if (!doc.schemesOfWork) missing.push("Schemes of Work");
      if (!doc.timetable) missing.push("Timetable");
      if (doc.lessonPlansPrepared < doc.totalExpectedLessons) missing.push("Lesson Plans");
      if (!doc.markingKeysSubmitted) missing.push("Marking Keys");
      if (!doc.progressChartUpdated) missing.push("Progress Chart");
      if (!doc.resultAnalysisSubmitted) missing.push("Result Analysis");
      if (!doc.observationInstrumentsSubmitted) missing.push("Observation Instruments");

      const comment = missing.length ? `Missing: ${missing.join(", ")}` : "All submitted";

      return {
        Teacher: doc.teacher ? doc.teacher.name : "Unknown",
        Email: doc.teacher ? doc.teacher.email : "Unknown",
        Term: doc.term,
        Year: doc.year,
        Syllabus: doc.syllabus,
        WorkPlan: doc.workPlan,
        SchemesOfWork: doc.schemesOfWork,
        Timetable: doc.timetable,
        LessonPlansPrepared: doc.lessonPlansPrepared,
        TotalExpectedLessons: doc.totalExpectedLessons,
        HomeworkGiven: doc.homeworkGiven,
        TestsGiven: JSON.stringify(doc.testsGiven),
        MarkingKeysSubmitted: doc.markingKeysSubmitted,
        ProgressChartUpdated: doc.progressChartUpdated,
        ResultAnalysisSubmitted: doc.resultAnalysisSubmitted,
        ObservationInstrumentsSubmitted: doc.observationInstrumentsSubmitted,
        LastUpdated: doc.lastUpdated,
        Comment: comment
      };
    });

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment(`Checklist_${term}_${year}.csv`);
    res.send(csv);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
