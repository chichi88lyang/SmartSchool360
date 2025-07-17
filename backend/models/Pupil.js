const mongoose = require("mongoose"); const pupilSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],  // ✅ Matches exactly with your Thunder Client request
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  attendance: [
    {
      date: Date,
      status: {
        type: String,
        enum: ["Present", "Absent", "Late"],  // ✅ Matches your attendance options
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Pupil", pupilSchema);
