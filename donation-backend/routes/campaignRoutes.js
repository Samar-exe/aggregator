const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");
const { isAdminLoggedIn } = require("../middleware/isAdminLoggedIn");

router.post("/create", isAdminLoggedIn, campaignController.createCampaign);
router.get("/", campaignController.getCampaigns);
router.get("/:id", campaignController.getCampaignById);
router.post("/:id/donate", campaignController.donateToCampaign);

module.exports = router;