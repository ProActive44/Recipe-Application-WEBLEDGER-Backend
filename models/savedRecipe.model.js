const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String },
  imageType: { type: String },
});

const recipeModel = model("recipe", recipeSchema);

module.exports = recipeModel;
