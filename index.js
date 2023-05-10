require("dotenv").config();
const express = require("express");
const app = express();
const routerTodo = require("./routes/todo");
const cors = require("cors");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

//Connect to db
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routerTodo);

app.all("*", notFound);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log("Server running on port 3000");
  });
});
