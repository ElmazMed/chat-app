import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, "Please add a fullname"],
    },
    profileImg: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      unique: true,
      minLength: [6, "The password is too short!"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
