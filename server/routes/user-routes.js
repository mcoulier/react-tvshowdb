const express = require("express");

const usersController = require("../controllers/usersController");
const router = require("./routes");

router.get("/");

router.get("/register", usersController.register);

router.get("/login", usersController.login);

router.post("/register");
