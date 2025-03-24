const userModel = require("../models/UserModel");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");

module.exports.createUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const newUser = new userModel({
      email,
      password,
      name,
    });
    await newUser.save();

    res.status(200).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    res.json({ message: "User logged in", token, role: "user" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};