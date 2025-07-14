const mongoose = require("mongoose");

const pupilAttendanceSchema = new mongoose.Schema({
  pupil: { type: mongoose.Schema.Types.ObjectId, ref: "Pupil", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent", "Late"], required: true },
  term: { type: String, required: true },
  year: { type: Number, required: true },
  grade: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("PupilAttendance", pupilAttendanceSchema);
