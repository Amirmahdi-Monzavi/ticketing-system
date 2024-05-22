const db = require("./dbConfig");
const bcrypt = require("bcrypt");

const plainPassword = "admin";
const saltRounds = 10;
const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

const createUsersTable = async () => {
  let connection;
  try {
    connection = await db.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user'
      );
    `);

    const username = "admin";

    const checkQuery = "SELECT COUNT(*) AS count FROM Users WHERE username = ?";
    const [existingUser] = await connection.query(checkQuery, [username]);

    if (existingUser[0].count > 0) {
      console.log("Admin already exists. No need to insert.");
      return;
    }

    const insertQuery =
      "INSERT INTO Users (username, password, role) VALUES (?, ?, ?)";
    const rows = await connection.query(insertQuery, [
      username,
      hashedPassword,
      "admin",
    ]);

    console.log("User inserted successfully:", rows);

    console.log("Users table created or already exists.");
  } catch (error) {
    console.error("Error creating Users table:", error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const checkExistingUser = async (username) => {
  try {
    const query = "SELECT * FROM Users WHERE username = ?";
    const result = await db.query(query, [username]);

    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error checking existing user:", error);
    throw error;
  }
};

const insertUser = async (username, hashedPassword) => {
  await db.query("INSERT INTO Users (username, password) VALUES (?, ?)", [
    username,
    hashedPassword,
  ]);
};

const getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM Users");
  return rows;
};

module.exports = {
  createUsersTable,
  checkExistingUser,
  insertUser,
  getAllUsers,
};
