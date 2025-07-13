const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/pupils", require("./routes/pupilRoutes"));

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
