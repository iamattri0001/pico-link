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
  visits: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  url: {
    type: String,
    required: true,
  },
});

export const ShortUrl =
  mongoose.models.ShortUrl || mongoose.model("ShortUrl", ShortUrlSchema);
