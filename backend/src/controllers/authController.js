require("dotenv").config({ path: "../../.env" });

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { checkExistingUser, insertUser } = require("../database/userQueries");
const secretKey = process.env.JWT_SECRET;

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username.trim() || !password.trim()) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid inputs" });
    }

    const existingUser = await checkExistingUser(username);
    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ status: "error", message: "Username already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await insertUser(username, hashedPassword);

    const token = jwt.sign({ username, role: "user" }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: { token, username, role: "user" },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username.trim() || !password.trim()) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid inputs" });
    }

    const existingUser = await checkExistingUser(username);

    if (existingUser.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const user = existingUser[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }

    const role = user.role;

    const token = jwt.sign({ username, role: role }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { token, username, role },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};
