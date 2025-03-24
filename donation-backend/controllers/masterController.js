const masterModel = require("../models/MasterModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.createMaster = async (req, res) => {
  try {
    let owners = await masterModel.find();
    if (owners.length > 0) {
      return res.status(403).send("You don't have permission to create new Admin");
    }
    let { email, username, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let createdMaster = await masterModel.create({
          email,
          username,
          password: hash,
        });
        let masterToken = generateToken(createdMaster);
        res.status(201).send({ message: "Master user created successfully", token: masterToken });
      });
    });
  } catch (error) {
    res.status(500).send("An error occurred");
  }
};

module.exports.loginMaster = async (req, res) => {
  const { email, password } = req.body;

  try {
    const master = await masterModel.findOne({ email });

    if (!master) {
      return res.status(401).send("Invalid email");
    }

    const isMatch = await bcrypt.compare(password, master.password);
    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }

    const masterToken = generateToken(master);
    res.send({ message: "Master user logged in successfully", token: masterToken });
  } catch (error) {
    res.status(500).send("An error occurred");
  }
};

module.exports.logoutMaster = (req, res) => {
  res.send({ message: "Logged out successfully" });
};
