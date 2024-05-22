const {
  getAllTickets,
  getTicketById,
  insertTicket,
} = require("../database/ticketQueries");

const fetchTickets = async (req, res) => {
  try {
    const tickets = await getAllTickets();
    return res.status(200).json({ status: "success", data: tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

const fetchSingleTicket = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket = await getTicketById(ticketId);
    if (ticket.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Ticket not found" });
    }
    return res.status(200).json({ status: "success", data: ticket });
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

const submitTicket = async (req, res) => {
  try {
    const { author, title, description, date } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid inputs" });
    }

    const formattedDate = new Date(date).toISOString().slice(0, 10);

    const ticketId = await insertTicket(
      author,
      title,
      description,
      formattedDate
    );
    return res.status(201).json({
      status: "success",
      message: "Ticket submitted successfully!",
      data: { ticketId },
    });
  } catch (error) {
    console.error("Error submitting ticket:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

module.exports = {
  fetchTickets,
  fetchSingleTicket,
  submitTicket,
};
