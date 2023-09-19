const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authMiddleware = require("./middlewares/authMiddleware");
const signupRouter = require("./routes/signup.Router");
const loginRouter = require("./routes/login.Router");
const connection = require("./config/db");
const savedRecipeRouter = require("./routes/savedRecipe.Router");
const recipeRouter = require("./routes/recipes.Router");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    '<h1>Welcome to the Server</h1><h2>Navigation</h2><ul><li><a href="/signup">Signup</a></li><li><a href="/login">Login</a></li><li><a href="/recipes">Recipes</a></li><li><a href="/saved">Saved Recipes</a></li></ul>'
  );
});

// app.use(authMiddleware);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/saved", savedRecipeRouter)
app.use("/recipes", recipeRouter)


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server has started on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
