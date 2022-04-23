const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const reportRoute = require("./routes/report");
//const Report = require("./models/Report");

const app = express();
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(function () {
    console.log("DB connection successfull!");
  })
  .catch(function (err) {
    console.log(err);
  });

app.use("/api/reports", reportRoute);

app.listen(process.env.PORT || 3000, function () {
  console.log("Server successfully started.");
});
