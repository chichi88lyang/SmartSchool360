const Pupil = require("../models/Pupil");

// ✅ Register a new pupil
exports.registerPupil = async (req, res) => {
  const { name, gender, grade } = req.body;

  try {
    const pupil = await Pupil.create({ name, gender, grade });
    res.status(201).json({ message: "Pupil registered", pupil });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Mark attendance for a pupil
exports.markAttendance = async (req, res) => {
  const { id } = req.params;
  const { date, status } = req.body;

  try {
    const pupil = await Pupil.findById(id);
    if (!pupil) return res.status(404).json({ message: "Pupil not found" });

    pupil.attendance.push({ date, status });
    await pupil.save();

    res.json({ message: "Attendance marked", attendance: pupil.attendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get attendance summary for a pupil
exports.getAttendanceSummary = async (req, res) => {
  const { id } = req.params;

  try {
    const pupil = await Pupil.findById(id);
    if (!pupil) return res.status(404).json({ message: "Pupil not found" });

    const summary = {
      total: pupil.attendance.length,
      present: pupil.attendance.filter((a) => a.status === "present").length,
      absent: pupil.attendance.filter((a) => a.status === "absent").length,
    };

    res.json({ name: pupil.name, grade: pupil.grade, summary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
