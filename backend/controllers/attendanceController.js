const User = require("../models/User");

// ✅ Teacher Login — mark present
exports.logLogin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "teacher") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const today = new Date().toISOString().split("T")[0];

    const alreadyLogged = user.attendance.find(
      (entry) => new Date(entry.date).toISOString().split("T")[0] === today
    );

    if (alreadyLogged) {
      return res.status(400).json({ message: "Already logged in today" });
    }

    user.attendance.push({
      date: new Date(),
      loginTime: new Date(),
      approved: false // Admin needs to approve manually
    });

    await user.save();

    res.json({ message: "Login recorded", date: today });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Teacher Logout — mark logout time
exports.logLogout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "teacher") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const today = new Date().toISOString().split("T")[0];

    const record = user.attendance.find(
      (entry) => new Date(entry.date).toISOString().split("T")[0] === today
    );

    if (!record) {
      return res.status(400).json({ message: "You haven't logged in today" });
    }

    if (record.logoutTime) {
      return res.status(400).json({ message: "Already logged out today" });
    }

    record.logoutTime = new Date();
    await user.save();

    res.json({ message: "Logout time recorded", date: today });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Admin Approves Attendance for a Specific Date
exports.approveAttendance = async (req, res) => {
  const { teacherId, date } = req.body;

  try {
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const targetDate = new Date(date).toISOString().split("T")[0];

    const record = teacher.attendance.find(
      (entry) => new Date(entry.date).toISOString().split("T")[0] === targetDate
    );

    if (!record) {
      return res.status(404).json({ message: "Attendance record not found for that date" });
    }

    if (record.approved) {
      return res.status(400).json({ message: "Already approved" });
    }

    record.approved = true;
    await teacher.save();

    res.json({
      message: "Attendance approved",
      teacher: teacher.name,
      date: targetDate
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Admin: View All Teacher Attendance Records
exports.getAllAttendanceRecords = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("name email attendance");

    const records = teachers.map((teacher) => ({
      name: teacher.name,
      email: teacher.email,
      attendance: teacher.attendance.map((entry) => ({
        date: entry.date,
        loginTime: entry.loginTime,
        logoutTime: entry.logoutTime,
        approved: entry.approved
      }))
    }));

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
