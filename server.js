require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) =>
    console.log("error while connecting to database", err.message)
  );

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
