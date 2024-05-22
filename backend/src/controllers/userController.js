const { getAllUsers } = require("../database/userQueries");

const fetchUsersLength = async (req, res) => {
  try {
    const users = await getAllUsers();
    const usersLength = users.length;
    return res.status(200).json({ status: "success", data: { usersLength } });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

module.exports = { fetchUsersLength };
