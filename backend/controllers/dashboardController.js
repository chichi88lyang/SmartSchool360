const TeacherDocument = require("../models/TeacherDocument");
const PupilAttendance = require("../models/PupilAttendance");
const Teacher = require("../models/User");

// ✅ Get Checklist Submission Summary
exports.getChecklistDashboard = async (req, res) => {
  const { term, year } = req.query;

  try {
    const records = await TeacherDocument.find({ term, year }).populate("teacher", "name email");

    const totalTeachers = await Teacher.countDocuments();
    const submitted = records.length;
    const pending = totalTeachers - submitted;

    res.json({ totalTeachers, submitted, pending, records });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Attendance Dashboard Summary
exports.getAttendanceDashboard = async (req, res) => {
  const { term, year } = req.query;

  try {
    const attendance = await PupilAttendance.find({ term, year });

    const summary = {
      totalRecords: attendance.length,
      present: attendance.filter(a => a.status === "Present").length,
      absent: attendance.filter(a => a.status === "Absent").length,
      late: attendance.filter(a => a.status === "Late").length,
    };

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
