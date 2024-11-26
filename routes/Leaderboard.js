const express = require("express");
const router = express.Router();
const { Form } = require("../config/connect");
router.get("/leaderboard", async (req, res) => {
  try {
    const { requirements } = req.query;

    if (!requirements || requirements.length === 0) {
      return res.status(400).send("No requirements provided.");
    }

    const requirementsArray = Array.isArray(requirements)
      ? requirements
      : [requirements];

    const allUsers = await Form.find().lean();

    const rankedUsers = allUsers
      .map((user) => {
        const offeringsArray = Array.isArray(user.offerings)
          ? user.offerings
          : [];
        const matchCount = requirementsArray.filter((req) =>
          offeringsArray.includes(req)
        ).length;

        return { ...user, offerings: offeringsArray, matchCount };
      })

      .filter((user) => user.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);

    res.render("leaderboard", { rankedUsers });
  } catch (err) {
    console.error("Error generating leaderboard:", err);
    res.status(500).send("Error generating leaderboard.");
  }
});

module.exports = router;
