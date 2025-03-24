const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/createAdmin", adminController.createAdmin);
router.post("/loginAdmin", adminController.loginAdmin);
router.post("/approveAdmin", adminController.approveAdmin);
router.post("/rejectAdmin", adminController.rejectAdmin);
router.get("/pendingApprovals", adminController.getPendingApprovals);

module.exports = router;