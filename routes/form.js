const express = require("express");

const router = express.Router();
const { Form } = require("../config/connect");

router.post("/submit", async (req, res) => {
  try {
    const { name, email, offerings, requirements } = req.body;

    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Offerings: ${offerings}`);
    console.log(`Requirements: ${requirements}`);

    const offeringsArray = Array.isArray(offerings) ? offerings : [offerings];
    const requirementsArray = Array.isArray(requirements)
      ? requirements
      : [requirements];
    const newForm = new Form({
      name,
      email,
      offerings: offeringsArray,
      requirements: requirementsArray,
    });

    const savedForm = await newForm.save();

    const query = requirementsArray
      .map((req) => `requirements[]=${encodeURIComponent(req)}`)
      .join("&");
    res.redirect(`/leaderboard?${query}`);
  } catch (err) {
    console.error("Error saving to database:", err);

    res.status(500).json({
      message: "Error saving to database.",
      error: err.message,
    });
  }
});

module.exports = router;
