const express = require("express");
const recipeModel = require("../models/savedRecipe.model");

const recipeRouter = express.Router();

recipeRouter.get("/", async (req, res) => {
  try {
    const { id, title, _page, _limit, _sort, _order } = req.query;
    const { _id, q } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 9;
    const skip = (page - 1) * limit;

    const sortOptions = {};
    const filter = {};

    if (_sort) {
      sortOptions[_sort] = _order === "desc" ? -1 : 1;
    }

    if (title) {
      filter.title = title;
    }
    if (id) {
      filter.id = id;
    }
    if (_id) {
      filter._id = _id;
    }

    if (q) {
      filter.$or = [
        { id: { $regex: q, $options: "i" } },
        { title: { $regex: q, $options: "i" } },
      ];
    }

    const totalCount = await recipeModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await recipeModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    res.json({ data, totalPages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

recipeRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await recipeModel.findById(id);

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
