const express = require("express");

const router = express.Router();

const routesControllers = require('../controllers/routesController');

router.get("/", (req, res, next) => {
  console.log("home route");
  res.json({ message: "HOMEPAGE" });
});

router.get("/user/:uid", routesControllers.getPlaceByUserId);


module.exports = router;
