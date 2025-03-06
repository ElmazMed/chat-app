import { generateToken } from "../lib/utils.js";
import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 carachters" });
    }
    const user = await User.findOne(email);

    if (user)
      return res
        .status(400)
        .json({ message: "Something went wrong. Please try again." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullName, email, password: hashedPassword });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullName,
        profileImg: newUser.profileImg,
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(`Err in the signup contoller ${error.message}`);
  }
};

const login = async (req, res) => {
  res.send("Login account");
};

const logout = async (req, res) => {
  res.send("Logout user");
};

export { register, login, logout };
