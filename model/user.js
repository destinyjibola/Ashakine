import mongoose from "mongoose";

const UserRole = Object.freeze({
  USER: 'USER',
  ADMIN: 'ADMIN'
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: false, sparse: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Date },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
  image: { type: String },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;