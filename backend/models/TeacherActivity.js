const mongoose = require("mongoose");

const teacherActivitySchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  action: { type: String, enum: ["Login", "Logout"], required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TeacherActivity", teacherActivitySchema);
