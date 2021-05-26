const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const checkToken = require("../helpers/check-token");

router.get("/", (req, res, next) => {
  res.send("api");
});

router.post("/register", usersController.register);

router.post("/login", usersController.login);

//Routes after need valid token
router.use(checkToken);

module.exports = router;
