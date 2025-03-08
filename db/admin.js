const pool = require("./databasepg");

async function dropMessagesTable() {
  try {
    await pool.query("DROP TABLE IF EXISTS messages");
    console.log("Messages table dropped successfully");
    return { success: true, message: "Messages table dropped successfully" };
  } catch (err) {
    console.error("Error dropping messages table:", err);
    throw err;
  }
}

/**
 *  (drop and recreate)
 */
async function resetMessagesTable() {
  try {
    // Drop
    await dropMessagesTable();

    // Recreate
    await pool.query(`
      CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        username VARCHAR(100) NOT NULL,
        time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Messages table has been reset (dropped and recreated)");
    return { success: true, message: "Messages table reset successfully" };
  } catch (err) {
    console.error("Error resetting messages table:", err);
    throw err;
  }
}

module.exports = {
  dropMessagesTable,
  resetMessagesTable,
};
