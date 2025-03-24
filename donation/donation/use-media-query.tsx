   const express = require("express");
   const router = express.Router();

   // Render the master user sign-up page
   router.get("/signup", (req, res) => {
       res.render("masterSignup");
   });

   // Render the master user sign-in page
   router.get("/signin", (req, res) => {
       res.render("masterSignin");
   });

   // Handle master user sign-up (POST request)
   router.post("/signup", (req, res) => {
       // Logic for creating a master user
       // e.g., save to database
       res.redirect("/api/master/signin");
   });

   // Handle master user sign-in (POST request)
   router.post("/signin", (req, res) => {
       // Logic for signing in a master user
       // e.g., authenticate and set session
       res.redirect("/"); // Redirect to home or dashboard
   });

   module.exports = router;