import { generateToken } from "../lib/utils.js";
import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "Something went wrong. Please try again." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullName, email, password: hashedPassword });

    await newUser.save();

    generateToken(newUser._id, res);

    res.status(201).json({
      id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      profileImg: newUser.profileImg,
    });
  } catch (error) {
    console.error("Error in the signup controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "Please add your email and password" });
    }

    const user = await User.findOne({ email });
    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    if (!comparedPassword) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImg: user.profileImg,
    });
  } catch (error) {
    console.error("Error in the Login controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.error("Error in the Logout controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateImg = async (req, res) => {
  const { profileImg } = req.body;
  try {
    const uploadResult = await cloudinary.uploader.upload(profileImg);

    res.status(201).json(uploadResult);
  } catch (error) {
    console.log(`Error in the upload image`);
  }
  res.status(200).json({ message: "Profile image updated" });
};

export { register, login, logout, updateImg };
