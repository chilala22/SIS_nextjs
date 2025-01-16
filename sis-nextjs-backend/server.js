const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const studentRoutes = require("./routes/students");
app.use("/students", studentRoutes);

// Test DB Route
const testRoutes = require("./routes/test");
app.use("/api", testRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
