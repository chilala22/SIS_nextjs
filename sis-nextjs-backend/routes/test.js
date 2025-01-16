const express = require("express");
const pool = require("../db/pool");
const router = express.Router();

router.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students');
        res.json(result.rows);
      } catch (err) {
        res.status(500).send(err.message);
      }
});

module.exports = router;
