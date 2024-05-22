const db = require("./dbConfig");

const createTicketsTable = async () => {
  let connection;
  try {
    connection = await db.getConnection();

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        author VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE
      )
    `);
  } catch (error) {
    console.error("Error creating or inserting into Tickets table:", error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getAllTickets = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM Tickets");
    return rows;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

const getTicketById = async (ticketId) => {
  try {
    const [row] = await db.query("SELECT * FROM Tickets WHERE id = ?", [
      ticketId,
    ]);
    if (!row) {
      throw new Error("Ticket not found");
    }
    return row;
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
    throw error;
  }
};

const insertTicket = async (author, title, description, date) => {
  try {
    const query = `
          INSERT INTO Tickets (author, title, description, date)
          VALUES (?, ?, ?, ?);
      `;

    const result = await db.query(query, [author, title, description, date]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTicketsTable,
  getAllTickets,
  getTicketById,
  insertTicket,
};
