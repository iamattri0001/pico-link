import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },

  shortCode: {
    type: String,
    required: true,
    unique: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ShortUrl =
  mongoose.models.ShortUrl || mongoose.model("ShortUrl", UserSchema);
export default ShortUrl;
