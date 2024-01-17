/* eslint-disable no-unused-vars */
const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const pool = require("./database");

const app = express();

const url = "https://www.seriouseats.com/all-recipes-5117749";
let recipeUrls = [];
axios
  .get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $(".comp").each((index, element) => {
      if (element && element.attribs && element.attribs.href) {
        recipeUrls.push(element.attribs.href);
      }
    });

    scrapeUrls(recipeUrls);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

const scrapeUrls = (recipeUrls) => {
  recipeUrls.forEach((recipeUrl, index) => {
    // console.log("[ ", index, " ] ", recipeUrl);
    axios(recipeUrl)
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
          const h1Element = $(this).find("h1");

          if (h1Element) {
            name = $(this).find("h1").text();
            description = $(this).find("p").text();
          }
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

        if (ingredients.length > 0) {
          recipes.push({ name, description, url: recipeUrl, photos, ingredients, instructions });

          // Insert data into PostgreSQL database
          const query =
            "INSERT INTO recipes (name, description, url, photos, ingredients, instructions) VALUES ($1, $2, $3, $4, $5, $6)";
          const values = [name, description, recipeUrl, photos, ingredients, instructions];

          pool.query(query, values, (err, result) => {
            if (err) {
              console.error("Error executing query", err);
            } else {
              console.log("Data inserted into the database");
            }
          });
        } else {
          console.log("Ingredients array is empty. Skipping insertion into the database.");
        }
      })
      .catch((err) => console.log(err));
  });
};

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
