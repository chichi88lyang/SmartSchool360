const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  loginTime: Date,
  logoutTime: Date,
  approved: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["teacher", "admin", "hod", "dht", "ht", "inspector"],
    default: "teacher"
  },
  grade: [String], // Teacher's assigned classes
  lastLogin: Date,

  // ✅ New:
  attendance: [attendanceSchema] // login/logout tracking with approval
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

