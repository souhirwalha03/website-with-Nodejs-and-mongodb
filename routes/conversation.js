const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/api/conversation-starter", (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ error: "User data is required." });
  }

  const starters = [
    `Hi ${user.name}, I heard you're offering ${user.offerings.join(
      ", "
    )}. How did you get started in this field?`,
    `Hey ${user.name}, what's the most exciting part of ${user.offerings[0]}?`,
    `Hello ${user.name}, if someone wanted to explore ${user.offerings.join(
      ", "
    )}, where should they start?`,
  ];

  const randomStarter = starters[Math.floor(Math.random() * starters.length)];
  res.json({ conversationStarter: randomStarter });
});

module.exports = router;
