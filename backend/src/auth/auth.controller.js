const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("./auth.model");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      email,
      name,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  register,
  login
};
