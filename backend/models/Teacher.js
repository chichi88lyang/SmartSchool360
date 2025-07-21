const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  role: { type: String, enum: ["Teacher", "Admin"], default: "Teacher" }
}, { timestamps: true });

module.exports = mongoose.model("Teacher", teacherSchema);
