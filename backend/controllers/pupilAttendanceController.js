const PupilAttendance = require("../models/PupilAttendance");
const Pupil = require("../models/Pupil");

// ✅ Mark Attendance
exports.markAttendance = async (req, res) => {
  const { id } = req.params;
  const { status, term, year } = req.body;

  try {
    const pupil = await Pupil.findById(id);
    if (!pupil) return res.status(404).json({ message: "Pupil not found" });

    const today = new Date().toISOString().split("T")[0];

    const exists = await PupilAttendance.findOne({
      pupil: id,
      date: today,
      term,
      year
    });

    if (exists) return res.status(400).json({ message: "Attendance already marked" });

    const attendance = new PupilAttendance({
      pupil: id,
      date: today,
      status,
      term,
      year,
      grade: pupil.grade
    });

    await attendance.save();
    res.status(201).json({ message: "Attendance marked", attendance });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Attendance Summary
exports.getAttendanceSummary = async (req, res) => {
  const { pupilId, grade, term, year } = req.query;

  try {
    const filter = { term, year };
    if (pupilId) filter.pupil = pupilId;
    if (grade) filter.grade = grade;

    console.log("Filter used:", filter);

    const records = await PupilAttendance.find(filter).populate("pupil", "name grade gender");

    if (!records.length) return res.status(404).json({ message: "No attendance records found." });

    const summary = {};

    records.forEach(record => {
      const id = record.pupil._id.toString();
      if (!summary[id]) {
        summary[id] = {
          name: record.pupil.name,
          grade: record.pupil.grade,
          present: 0,
          absent: 0,
          late: 0,
          total: 0
        };
      }
      if (record.status === "Present") summary[id].present++;
      else if (record.status === "Absent") summary[id].absent++;
      else if (record.status === "Late") summary[id].late++;
      summary[id].total++;
    });

    res.status(200).json({ term, year, summary: Object.values(summary) });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
