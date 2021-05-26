const HttpError = require("../models/error");
const jwt = require("jsonwebtoken");
const privateKey = process.env.privateKey;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Auth failed.");
    }
    const verifiedToken = jwt.verify(token, privateKey);
    req.userData = { userId: verifiedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Auth failed.", 401);
    return next(error);
  }
};
