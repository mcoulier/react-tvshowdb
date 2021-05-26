const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likesSchema = new Schema({
  showId: { type: String, required: true, unique: true },
  showTitle: { type: String},
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Likes", likesSchema);
