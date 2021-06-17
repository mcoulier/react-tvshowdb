const express = require("express");
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user-routes");
const HttpError = require("./models/error");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const MONGO_DB = process.env.MONGO_DB;
//const cors = require("cors");
const app = express();

/* const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
}; */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://zapzilla.netlify.app");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, HEAD, POST, PATCH, PUT, DELETE"
  );
  next();
});

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

app.use("/api/users", /* cors(corsOptions), */ userRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Something went wrong!" });
});

app.listen(port);
