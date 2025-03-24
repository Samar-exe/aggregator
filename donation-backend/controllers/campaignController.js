const mongoose = require("mongoose");
const Campaign = require("../models/CampaignModel");

const CampaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
});

module.exports = mongoose.model("Campaign", CampaignSchema);

module.exports.createCampaign = async (req, res) => {
  const { title, description, goalAmount } = req.body;
  const adminId = req.user.id; // Assuming req.user contains the authenticated admin's info

  try {
    const newCampaign = new Campaign({
      title,
      description,
      goalAmount,
      adminId,
    });
    await newCampaign.save();

    res.status(200).json({
      message: "Campaign created successfully",
      data: newCampaign,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating campaign" });
  }
};

module.exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ message: "Error fetching campaigns" });
  }
};

module.exports.getCampaignById = async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Error fetching campaign" });
  }
};

module.exports.donateToCampaign = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    campaign.raisedAmount += amount;
    await campaign.save();

    res.status(200).json({ message: "Donation successful", data: campaign });
  } catch (err) {
    res.status(500).json({ message: "Error donating to campaign" });
  }
};