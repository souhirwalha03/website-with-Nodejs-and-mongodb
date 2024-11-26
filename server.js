const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const routeform = require("./routes/form");
const routeLeaderboard = require("./routes/Leaderboard");
const routeconversation = require("./routes/conversation");
const path = require("path");
require("./config/connect");

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routeform);
app.use(routeLeaderboard);
app.use(routeconversation);

app.get("/leaderboard", (req, res) => {
  res.render("leaderboard", { users: [] });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
