const express = require("express");
const searchRecipes = require("../Helper/searchRecipes");

const recipeRouter = express.Router();

recipeRouter.get("/", async (req, res) => {
  try {
    const { id, title, _page, _limit, _sort, _order } = req.query;
    const { _id, q } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 9;
    const skip = (page - 1) * limit;

    const filter = {};

    if (title) {
      filter.title = title;
    }
    if (id) {
      filter.id = id;
    }
    if (_id) {
      filter._id = _id;
    }
    // console.log(q)

    const recipes = await searchRecipes(0, q, filter);

    const data = recipes.results.slice(skip, skip + limit).sort((a, b) => {
      if (_sort && a[_sort] && b[_sort]) {
        return _order === "desc" ? b[_sort] - a[_sort] : a[_sort] - b[_sort];
      }
      return 0;
    });
    let totalPages = Math.ceil(recipes.totalResults / limit);

    res.json({ data, totalPages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

recipeRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await searchRecipes(id);

    if (!recipe) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

module.exports = recipeRouter;
