const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  status: { type: String, enum: ["present", "absent"], required: true }
});

const pupilSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  grade: { type: String, required: true },
  attendance: [attendanceSchema]
});

module.exports = mongoose.model("Pupil", pupilSchema);
