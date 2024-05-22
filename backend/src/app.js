require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const userQueries = require("./database/userQueries");
const ticketQueries = require("./database/ticketQueries");
const ticketRoutes = require("./routes/ticketRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const verifyTokenMiddleware = require("./middlewares/verifyTokenMiddleware");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

userQueries.createUsersTable();
ticketQueries.createTicketsTable();

app.use("/submit-ticket", verifyTokenMiddleware);

app.use(authRoutes);
app.use(ticketRoutes);
app.use(userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
