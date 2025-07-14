const mongoose = require("mongoose");

const PupilResultSchema = new mongoose.Schema({
  pupil: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pupil",
    required: true,
  },
  term: { type: String, required: true },
  year: { type: String, required: true },
  subject: { type: String, required: true },
  ca1: { type: Number, default: 0 },
  ca2: { type: Number, default: 0 },
  exam: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  grade: { type: String },
  remark: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("PupilResult", PupilResultSchema);
