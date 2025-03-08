const db = require("./db/queries");

async function getMessages(req, res) {
  console.log("getMessages controller called");
  try {
    const messages = await db.getMessages();
    res.json(messages);
  } catch (err) {
    console.error("Error in getMessages controller:", err);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
}

async function getMessage(req, res) {
  console.log("getMessage controller called for id:", req.params.id);
  try {
    const id = req.params.id;
    const message = await db.getMessageById(id);
    if (!message) {
      console.log("Message not found with id:", id);
      res.status(404).json({ error: "Message not found" });
      return;
    }
    res.json(message);
  } catch (err) {
    console.error("Error in getMessage controller:", err);
    res.status(500).json({ error: "Failed to retrieve message" });
  }
}

async function postMessage(req, res) {
  console.log("postMessage controller called with body:", req.body);
  try {
    const { text, user } = req.body;

    if (!text || !user) {
      return res
        .status(400)
        .json({ error: "Message must contain text and user fields" });
    }

    const newMessage = await db.createMessage(text, user);
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error in postMessage controller:", err);
    res.status(500).json({ error: "Failed to create message" });
  }
}

module.exports = {
  getMessages,
  getMessage,
  postMessage,
};
