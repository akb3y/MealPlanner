/* eslint-disable no-unused-vars */
const express = require("express");
const pool = require("./database");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, Node.js Backend!");
});

router.get("/getAll", (req, res) => {
  const query = "SELECT * FROM recipe";
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result.rows);
    }
  });
});

router.get("/getOne/:recipe_id", (req, res) => {
  const { recipe_id } = req.params;

  const query = "SELECT * FROM recipe WHERE recipe_id = $1";
  const values = [recipe_id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.send(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result.rows);
    }
  });
});

router.post("/addRecipe", (req, res) => {
  const { name, description, ingredients, instructions, photos } = req.body;

  const values = [name, description, ingredients, instructions, photos];

  const query =
    "INSERT INTO recipe (name, description, ingredients, instructions, photos) VALUES ($1, $2, $3, $4, $5) RETURNING *";

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).send("Successfully added");
    }
  });
});

router.delete("/removeRecipe/:recipe_id", (req, res) => {
  const { recipe_id } = req.params;

  const query = "DELETE FROM recipe WHERE recipe_id = $1";
  const values = [recipe_id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).send("Successfully removed recipe");
    }
  });
});

router.put("/updateRecipe/:recipe_id", (req, res) => {
  const { recipe_id } = req.params;
  const { name, description, photos, ingredients, instructions } = req.body;

  // Check if required fields are provided
  if (!name || !description || !ingredients || !instructions) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Update data in PostgreSQL database
  const query = `
    UPDATE recipe
    SET name = $1, description = $2, photos = $3, ingredients = $4, instructions = $5
    WHERE recipe_id = $6
  `;

  const values = [name, description, photos, ingredients, instructions, recipe_id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Recipe updated successfully" });
    }
  });
});

module.exports = router;
