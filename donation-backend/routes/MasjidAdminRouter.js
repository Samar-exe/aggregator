const express = require("express");
const router = express.Router();
const { createAdmin, approveAdmin, loginAdmin } = require("../controllers/adminController");

router.get('/loginAdmin', (req, res) => {
  res.render("Login");
});

router.post("/createAdmin", createAdmin);
router.post("/loginAdmin", loginAdmin);
router.post("/approveAdmin", approveAdmin);

module.exports = router;