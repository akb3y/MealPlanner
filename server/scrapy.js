/* eslint-disable no-unused-vars */
const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const pool = require("./database");

const app = express();

const url = "https://www.seriouseats.com/yogurt-marinated-chicken-thighs-pickled-nectarines";
axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const recipes = [];

    // Assuming the data is inside a container with a specific class or ID
    $("#heading_1-0").each(function () {
      const name = $(this).find("h1").text();
      const description = $(this).find("p").text();

      // Push the data to the recipes array
      recipes.push({ name, description });

      // Insert data into PostgreSQL database
      const query = "INSERT INTO recipes (name, description) VALUES ($1, $2)";
      const values = [name, description];

      pool.query(query, values, (err, result) => {
        if (err) {
          console.error("Error executing query", err);
        } else {
          console.log("Data inserted into the database");
        }
      });
    });

    // Log the recipes array (optional)
    console.log(recipes);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
