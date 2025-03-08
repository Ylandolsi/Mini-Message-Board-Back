const express = require("express");
const router = express.Router();
const { dropMessagesTable, resetMessagesTable } = require("../db/admin");
const { seedDatabase } = require("../db/seed");

router.post("/drop-messages", async (req, res) => {
  try {
    const result = await dropMessagesTable();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/reset-messages", async (req, res) => {
  try {
    await resetMessagesTable();
    res.json({ success: true, message: "Messages table reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/reset-and-seed", async (req, res) => {
  try {
    await resetMessagesTable();
    await seedDatabase();
    res.json({
      success: true,
      message: "Messages table reset and seeded successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
