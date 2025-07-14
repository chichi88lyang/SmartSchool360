const PupilAttendance = require("../models/PupilAttendance");
const Pupil = require("../models/Pupil");

exports.getAttendanceSummary = async (req, res) => {
  const { pupilId, grade, term, year } = req.query;

  try {
    let filter = { term, year };
    if (pupilId) filter.pupil = pupilId;
    if (grade) filter.grade = grade;

    const attendanceRecords = await PupilAttendance.find(filter).populate("pupil", "name gender grade");

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: "No attendance records found." });
    }

    const summaryMap = {};
    attendanceRecords.forEach(record => {
      const id = record.pupil._id.toString();
      if (!summaryMap[id]) {
        summaryMap[id] = {
          name: record.pupil.name,
          grade: record.pupil.grade,
          present: 0,
          absent: 0,
          late: 0,
          total: 0
        };
      }
      if (record.status === "Present") summaryMap[id].present++;
      else if (record.status === "Absent") summaryMap[id].absent++;
      else if (record.status === "Late") summaryMap[id].late++;
      summaryMap[id].total++;
    });

    const summary = Object.values(summaryMap);

    res.status(200).json({ term, year, summary });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
