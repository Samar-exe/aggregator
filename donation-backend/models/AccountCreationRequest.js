const mongoose = require("mongoose");

const MasjidAdminRequestSchema = new mongoose.Schema({
  MasjidName: { type: String, required: true }, // Masjid Name
  adminName: { type: String, required: true }, // Admin managing the Masjid
  email: { type: String, required: true},
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  isApproved: { type: Boolean, default: false }, // Approval status by Master Admin
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MasjidAdmin", MasjidAdminRequestSchema);