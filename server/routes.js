const express = require("express");
const pool = require("./database");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, Node.js Backend!");
});

router.get("/getAll", (req, res) => {
  const query = "SELECT * FROM recipes";
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result.rows);
    }
  });
});

router.post("/addRecipe", (req, res) => {
  const { name, description, ingredients, instructions, photos } = req.body;

  // Assuming ingredients and instructions are arrays, and photos is an array
  const values = [name, description, ingredients, instructions, photos];

  const query =
    "INSERT INTO recipes (name, description, ingredients, instructions, photos) VALUES ($1, $2, $3, $4, $5) RETURNING *";

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result.rows[0]); // Assuming you want to send back the newly added recipe
    }
  });
});

module.exports = router;
