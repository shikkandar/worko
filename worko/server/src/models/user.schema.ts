import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  jobTitle: {
    type: String,
    enum: ["developer", "manager", "director"],
    default: "developer",
  },
  role: { type: String, enum: ["user", "emp", "admin"], default: "user" },
  resume: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
