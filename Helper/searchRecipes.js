const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
async function searchRecipes(id, q, filter = {}) {
  let url = "https://api.spoonacular.com/recipes/complexSearch";

  url += `?apiKey=${API_KEY}`;

  if (q) {
    url += `&query=${q}`;
  }

//   if (id) {
//     url = `https://api.spoonacular.com/recipes/${id}`;
//     url += `?apiKey=${API_KEY}`;
//   }

//   console.log(url);
  try {
    const response = await axios.get(url, {
      params: {
        ...filter,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = searchRecipes;
