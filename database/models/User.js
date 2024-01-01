import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,

  verifyToken: String,
  verifyTokenExpiry: Date
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;