const pool = require("./databasepg");
const { seedDatabase } = require("./seed");

async function getMessages() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM messages ORDER BY time DESC"
    );
    return rows;
  } catch (err) {
    console.error("Error fetching messages:", err);
    throw err;
  }
}

async function getMessageById(id) {
  try {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
      id,
    ]);
    return rows[0];
  } catch (err) {
    console.error(`Error fetching message with id ${id}:`, err);
    throw err;
  }
}

async function createMessage(text, user) {
  try {
    console.log("server weslet");
    const time = new Date();
    const { rows } = await pool.query(
      "INSERT INTO messages (text, username, time) VALUES ($1, $2, $3) RETURNING *",
      [text, user, time]
    );
    return rows[0];
  } catch (err) {
    console.error("Error creating message:", err);
    throw err;
  }
}

async function setupDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        username VARCHAR(100) NOT NULL,
        time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Database setup completed");

    // seed the database
    await seedDatabase();
  } catch (err) {
    console.error("Error setting up database:", err);
    throw err;
  }
}

module.exports = {
  getMessages,
  getMessageById,
  createMessage,
  setupDatabase,
};
