const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./auth/auth.route");

const app = express();
const PORT = process.env.PORT || 5001;

// 1. CORS MUST be first to handle preflight (OPTIONS) requests
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// 2. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Pick my Laundry API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
