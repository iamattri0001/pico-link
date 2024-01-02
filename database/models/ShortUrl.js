import mongoose from "mongoose";

const ShortUrlSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  visitCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

export const ShortUrl =
  mongoose.models.ShortUrl || mongoose.model("ShortUrl", ShortUrlSchema);
