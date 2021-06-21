const express = require("express");
const usersController = require("../controllers/usersController");
const checkToken = require("../helpers/check-token");
const router = express.Router();

/* router.get("/", (req, res, next) => {
  res.send("api");
}); */

router.post("/register", usersController.register);

router.post("/login", usersController.login);

router.delete("/:uid/deleteUser", usersController.deleteUser);

router.get("/:uid/userlikes", usersController.userLikes);

router.patch("/:uid/like", usersController.updateLike);

router.delete("/:uid/unlike", usersController.deleteLike);

//Routes after need valid token
/* router.use(checkToken); */

module.exports = router;
