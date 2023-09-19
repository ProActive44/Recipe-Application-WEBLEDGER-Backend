const express = require("express");
const recipeModel = require("../models/savedRecipe.model");

const savedRecipeRouter = express.Router();

savedRecipeRouter.get("/", async (req, res) => {
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

savedRecipeRouter.get("/:id", async (req, res) => {
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



savedRecipeRouter.post("/", async (req, res) => {
  try {
    const { id, title, image, imageType } = req.body;

    if (!id || !title) {
      return res.status(400).json({ error: "ID and Title are required fields" });
    }

    const newRecipe = new recipeModel({
      id,
      title,
      image,
      imageType,
    });

    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new recipe" });
  }
});




module.exports = savedRecipeRouter;
