const HttpError = require("../models/error");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const privateKey = process.env.privateKey;

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Registering failed.", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User already exists", 422);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Registering failed.", 500);
    return next(error);
  }

  const createdUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Registering failed.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      privateKey,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Registering failed.", 500);
    return next(error);
  }
  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Login failed.", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Invalid credentials, please try again.", 401);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Login failed.", 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Invalid credentials, please try again.", 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      privateKey,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Login failed.", 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    email: existingUser.email,
    token: token,
  });
};

const updateLike = async (req, res, next) => {
  const { showId, showName } = req.body;

  const result = await User.findByIdAndUpdate(
    req.params.uid,
    { $addToSet: { likes: { showId: showId, showName: showName } } },
    { safe: true, upsert: true },
    function (err, model) {
      console.log(err);
    }
  );
};

const deleteLike = async (req, res, next) => {};

const userLikes = async (req, res, next) => {
  const result = await User.findById(req.params.uid);

  res.json({
    result,
  });
};

exports.register = register;
exports.login = login;
exports.updateLike = updateLike;
exports.deleteLike = deleteLike;
exports.userLikes = userLikes;
