const HttpError = require("../models/error");
const User = require("../models/user");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Sign up failed.", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User already exists", 422);
    return next(error);
  }

  const createdUser = new User({
    username,
    email,
    password,
    date,
    likes,
  })

};

const login = (req, res, next) => {
  const { email, password } = req.body;
};

exports.register = register;
exports.login = login;
