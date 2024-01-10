/* eslint-disable no-unused-vars */
const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const pool = require("./database");

const app = express();

const url = "https://www.seriouseats.com/persian-braised-eggplant-with-kashk-recipe-8424540"
// let recipeUrls = [];
// axios
//   .get(url)
//   .then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html);

//     // Replace '.recipe-link' with the appropriate selector for recipe links
//     $(".comp").each((index, element) => {
//       if (element && element.attribs && element.attribs.href) {
//         recipeUrls.push(element.attribs.href);
//       }
//     });

//     console.log(recipeUrls);
//   })
//   .catch((error) => {
//     console.error("Error:", error.message);
//   });

  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const recipes = [];
      let name;
      let description;
      let photos;
      let ingredients = [];
      let instructions = [];

      // Assuming the data is inside a container with a specific class or ID
      $(".article-header").each(function () {
        name = $(this).find("h1").text();
        description = $(this).find("p").text();
        photos = $(this).find("img").attr("src");
      });

      $(".primary-image__media").each(function () {
        photos = $(this).find("img").attr("src");
      });

      $("#structured-ingredients_1-0 li").each(function () {
        let ingredient = $(this).text().trim(); // trim to remove leading/trailing spaces
        ingredients.push(ingredient);
      });

      $("#structured-project__steps_1-0 p").each(function () {
        let instruction = $(this).text().trim();
        instructions.push(instruction);
      });

      recipes.push({ name, description, url, photos, ingredients, instructions });

      // Insert data into PostgreSQL database
      const query =
        "INSERT INTO recipes (name, description, url, photos, ingredients, instructions) VALUES ($1, $2, $3, $4, $5, $6)";
      const values = [name, description, url, photos, ingredients, instructions];

      pool.query(query, values, (err, result) => {
        if (err) {
          console.error("Error executing query", err);
        } else {
          console.log("Data inserted into the database");
        }
      });
      // // Log the recipes array (optional)
      console.log(instructions);
    })
    .catch((err) => console.log(err));


app.listen(PORT, () => console.log(`listening on port ${PORT}`));
