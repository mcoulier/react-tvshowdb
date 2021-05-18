const express = require("express");
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user-routes");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const MONGO_DB = process.env.MONGO_DB;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

app.use("/", userRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Something went wrong!" });
});

app.listen(port);
