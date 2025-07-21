const User = require("../models/User");

// ✅ Log Teacher Activity (login/logout)
exports.logActivity = async (req, res) => {
  const { userId, date, loginTime, logoutTime, approved } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Teacher not found" });

    const log = {
      date: new Date(date),
      loginTime: loginTime ? new Date(loginTime) : null,
      logoutTime: logoutTime ? new Date(logoutTime) : null,
      approved: approved || false
    };

    user.attendance.push(log);
    await user.save();

    res.status(201).json({ message: "Activity logged", log });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Logs with Filters
exports.getLogs = async (req, res) => {
  const { date, userId, approved } = req.query;

  try {
    let query = {};
    if (userId) query._id = userId;

    const users = await User.find(query);

    let allLogs = [];

    users.forEach(user => {
      user.attendance.forEach(record => {
        let match = true;
        if (date && new Date(record.date).toISOString().split('T')[0] !== date) match = false;
        if (approved !== undefined && String(record.approved) !== approved) match = false;

        if (match) {
          allLogs.push({
            userId: user._id,
            name: user.name,
            date: record.date,
            loginTime: record.loginTime,
            logoutTime: record.logoutTime,
            approved: record.approved
          });
        }
      });
    });

    res.status(200).json({ count: allLogs.length, logs: allLogs });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
