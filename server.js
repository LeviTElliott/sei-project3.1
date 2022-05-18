///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 4200, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL);
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const characterSchema = new mongoose.Schema({
    name: String,
    image: String,
    race: String,
    class: String,
    realm: String,
    level: String,
});

const Character = mongoose.model("character", characterSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// toon INDEX ROUTE
app.get("/character", async (req, res) => {
  try {
    // get all people
    res.json(await Character.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// toon CREATE ROUTE
app.post("/character", async (req, res) => {
  try {
    // send all people
    res.json(await Character.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// toon UPDATE ROUTE
app.put("/character/:id", async (req, res) => {
  try {
    // update people by ID
    res.json(
      await Character.findByIdAndUpdate(req.params.id, req.body)
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// toon DELETE ROUTE
app.delete("/character/:id", async (req, res) => {
  try {
    // delete people by ID
    res.json(await Character.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));