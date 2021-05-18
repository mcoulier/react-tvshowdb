const express = require("express");
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const userRoutes = require("./routes/routes");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const MONGO_DB = process.env.MONGO_DB;

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

app.use("/api", userRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Something went wrong!" });
});

app.listen(port);
