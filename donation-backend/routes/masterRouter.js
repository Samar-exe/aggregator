const express = require("express");
const router = express.Router();
const masterController = require("../controllers/masterController");

router.post("/signup", masterController.createMaster);
router.post("/signin", masterController.loginMaster);

module.exports = router;