const adminModel = require("../models/AccountCreationRequest");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");

module.exports.createAdmin = async (req, res) => {
  const { MasjidName, adminName, password, email, phone, address } = req.body;

  try {
    const newAdminRequest = new adminModel({
      MasjidName,
      adminName,
      password,
      email,
      phone,
      address,
    });
    await newAdminRequest.save();

    res.status(200).json({
      message: "Admin request pending approval",
      data: newAdminRequest,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating admin request" });
  }
};

module.exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Account does not exist" });
    }

    if (!admin.isApproved) {
      return res.status(403).json({ message: "Account not approved yet" });
    }

    // const isMatch = await bcrypt.compare(password, admin.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid password" });
    // }

    const token = generateToken(admin);
    res.json({ message: "Admin logged in", token, role: "admin" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};

module.exports.approveAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    const adminData = await adminModel.findOne({ email });

    if (!adminData) {
      return res.status(404).json({ message: "Admin request not found" });
    }

    adminData.isApproved = true;
    await adminData.save();

    res.status(200).json({ message: "Admin approved and saved to database" });
  } catch (err) {
    res.status(500).json({ message: "Error approving admin" });
  }
};

module.exports.rejectAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    const adminData = await adminModel.findOne({ email });

    if (!adminData) {
      return res.status(404).json({ message: "Admin request not found" });
    }

    await adminModel.deleteOne({ email });

    res.status(200).json({ message: "Admin request rejected and removed from database" });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting admin" });
  }
};

module.exports.getPendingApprovals = async (req, res) => {
  try {
    const pendingApprovals = await adminModel.find({ isApproved: false });
    res.status(200).json(pendingApprovals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pending approvals" });
  }
};