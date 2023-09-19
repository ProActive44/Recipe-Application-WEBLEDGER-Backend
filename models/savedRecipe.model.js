const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  id: { type: Number },
  title: { type: String },
  image: { type: String },
  imageType: { type: String },
});

const recipeModel = model("recipe", recipeSchema);

module.exports = recipeModel;
