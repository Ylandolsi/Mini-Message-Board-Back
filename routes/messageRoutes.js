const express = require("express");
const router = express.Router();
const messagesController = require("../messagesController");

console.log("Controller imported:", Object.keys(messagesController));

router.get("/", (req, res) => {
  console.log("GET / route hit");
  try {
    return messagesController.getMessages(req, res);
  } catch (err) {
    console.error("Error in GET /:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.get("/:id", (req, res) => {
  console.log(`GET /${req.params.id} route hit`);
  try {
    return messagesController.getMessage(req, res);
  } catch (err) {
    console.error("Error in GET /:id:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.post("/", (req, res) => {
  console.log("POST / route hit with body:", req.body);
  try {
    return messagesController.postMessage(req, res);
  } catch (err) {
    console.error("Error in POST /:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
