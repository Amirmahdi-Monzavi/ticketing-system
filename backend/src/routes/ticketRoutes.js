const express = require("express");
const router = express.Router();

const {
  fetchTickets,
  fetchSingleTicket,
  submitTicket,
} = require("../controllers/ticketController");

router.get("/admin/tickets", fetchTickets);

router.get("/admin/tickets/:id", fetchSingleTicket);

router.post("/submit-ticket", submitTicket);

module.exports = router;
