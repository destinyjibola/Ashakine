import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide a name"],
    // unique: true,
  },
  email: {
    type: String,
    require: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please provide a password"],
  },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   isAdmin: {
//     type: Number,
//     default: 1
//   },
//   forgetPasswordToken: String,
//   forgetPasswordTokenExpiry: Date,
//   verifyToken: String,
//   verifyTokenExpiry: Date
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;