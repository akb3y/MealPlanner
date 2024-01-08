const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

app.use(cors());
app.use(express.json({ limit: "5000kb" }));
app.use(express.urlencoded({ limit: "5000kb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, Node.js Backend!");
});

app.get("/getAll", (req, res) => {
  const query = "SELECT * FROM employees";
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result.rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
