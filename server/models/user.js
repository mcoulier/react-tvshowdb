const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  date: { type: Date, default: Date.now },
  likes: { type: Schema.Types.ObjectId, ref: "Likes" },
});

module.exports = mongoose.model("User", userSchema);
