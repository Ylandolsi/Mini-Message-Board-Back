const pool = require("./databasepg");

const sampleMessages = [
  {
    text: "Welcome to the Message Board!",
    username: "Admin",
    time: new Date(),
  },
  {
    text: "This is a sample message. Feel free to add your own!",
    username: "System",
    time: new Date(Date.now() - 3600000),
  },
  {
    text: "Hello World! This is my first post.",
    username: "User1",
    time: new Date(Date.now() - 7200000),
  },
  {
    text: "I love this message board application!",
    username: "Enthusiast",
    time: new Date(Date.now() - 86400000),
  },
  {
    text: "Looking forward to connecting with everyone here.",
    username: "Newbie",
    time: new Date(Date.now() - 172800000),
  },
];

async function seedDatabase() {
  try {
    const { rows } = await pool.query("SELECT COUNT(*) FROM messages");
    const count = parseInt(rows[0].count);

    // Only seed if the table is empty
    if (count === 0) {
      console.log("Database is empty. Seeding with sample messages...");

      for (const message of sampleMessages) {
        await pool.query(
          "INSERT INTO messages (text, username, time) VALUES ($1, $2, $3)",
          [message.text, message.username, message.time]
        );
      }

      console.log(
        `Seeded database with ${sampleMessages.length} sample messages`
      );
    } else {
      console.log(`Database already has ${count} messages. Skipping seed.`);
    }
  } catch (err) {
    console.error("Error seeding database:", err);
    throw err;
  }
}

module.exports = { seedDatabase };
