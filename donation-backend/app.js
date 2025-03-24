const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./db/db");
const MasjidAdminRouter = require("./routes/MasjidAdminRouter");
const adminRoutes = require("./routes/adminRoutes");
const masterRoutes = require("./routes/masterRouter");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(bodyParser.json());

// Routes
app.use("/", MasjidAdminRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/master", masterRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});