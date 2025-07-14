const PupilResult = require("../models/PupilResult");

exports.submitResult = async (req, res) => {
  const { pupil, term, year, subject, ca1, ca2, exam } = req.body;

  try {
    const total = ca1 + ca2 + exam;

    // Auto-generate grade and remark
    let grade = "F", remark = "Fail";
    if (total >= 84) { grade = "A"; remark = "1st Distinction"; }
    else if (total >= 70) { grade = "B"; remark = "2nd Distinction"; }
    else if (total >= 64) { grade = "C"; remark = "Merit"; }
    else if (total >= 50) { grade = "D"; remark = "Credit"; }
    else if (total >= 40) { grade = "E"; remark = "Pass"; }

    const result = new PupilResult({
      pupil, term, year, subject,
      ca1, ca2, exam,
      total, grade, remark
    });

    await result.save();

    res.status(201).json({ message: "Result submitted", result });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
