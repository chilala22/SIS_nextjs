const express = require("express");
const pool = require("../db/pool");
const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get students with optional filtering
router.get("/", async (req, res) => {
  try {
    const { className, minGrade, maxGrade } = req.query;

    let query = "SELECT * FROM students WHERE 1=1";
    const params = [];

    if (className) {
      query += " AND class = $1";
      params.push(className);
    }

    if (minGrade) {
      query += params.length > 0 ? " AND grade >= $2" : " AND grade >= $1";
      params.push(minGrade);
    }

    if (maxGrade) {
      query += params.length > 1 ? " AND grade <= $3" : params.length > 0 ? " AND grade <= $2" : " AND grade <= $1";
      params.push(maxGrade);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.post("/", async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // Debug log
    const { name, className, grade, attendance } = req.body;
    const result = await pool.query(
      "INSERT INTO students (name, class, grade, attendance) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, className, grade, attendance]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a student
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, className, grade, attendance } = req.body;
    const result = await pool.query(
      "UPDATE students SET name = $1, class = $2, grade = $3, attendance = $4 WHERE id = $5 RETURNING *",
      [name, className, grade, attendance, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a student
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM students WHERE id = $1", [id]);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/analytics", async (req, res) => {
  try {
    // Attendance distribution
    const attendanceQuery = `
      SELECT 
        CASE
          WHEN attendance >= 90 THEN '90-100'
          WHEN attendance >= 80 THEN '80-89'
          WHEN attendance >= 70 THEN '70-79'
          WHEN attendance >= 60 THEN '60-69'
           WHEN attendance >= 50 THEN '50-59'
          ELSE 'Below 50'
        END as attendance_range,
        COUNT(*) as count
      FROM students
      GROUP BY attendance_range
      ORDER BY attendance_range
    `;
    const attendanceResult = await pool.query(attendanceQuery);

    // Grade distribution
    const gradeQuery = `
      SELECT 
        CASE
          WHEN grade >= 90 THEN '90-100'
          WHEN grade >= 80 THEN '80-89'
          WHEN grade >= 70 THEN '70-79'
          WHEN grade >= 60 THEN '60-69'
          WHEN grade >= 50 THEN '50-59'
          ELSE 'Below 50'
        END as grade_range,
        COUNT(*) as count
      FROM students
      GROUP BY grade_range
      ORDER BY grade_range
    `;
    const gradeResult = await pool.query(gradeQuery);

    res.json({
      attendance: attendanceResult.rows,
      grades: gradeResult.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
