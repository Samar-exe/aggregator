const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
});

module.exports = mongoose.model("Campaign", CampaignSchema);