import express from "express";
import { pool } from "./data.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (missing fields or user already exists)
 */
router.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    console.log("⚠️ [REGISTER] Failed: Missing required fields");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const checkEmail = await pool.query("SELECT id FROM users WHERE email = $1;", [email]);
    if (checkEmail.rows.length > 0) {
      console.log(`⚠️ [REGISTER] Failed: Email ${email} already exists`);
      return res.status(400).json({ message: "User already exists" });
    }

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email;",
      [name, email, password]
    );
    
    const newUser = result.rows[0];

    // Fetch all users to display updated table
    const allUsers = await pool.query("SELECT id, name, email FROM users ORDER BY id ASC;");

    console.log(`\n📝 [REGISTER] Naya admin manager account registered (PostgreSQL): ${newUser.name} (${newUser.email})`);
    console.log("📊 Updated User Database in Backend:");
    console.table(allUsers.rows);
    console.log("\n");

    res.status(201).json({
      message: "User successfully registered",
      user: newUser,
    });
  } catch (err) {
    console.error("Error in registration:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid credentials or missing fields
 */
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("⚠️ [LOGIN] Failed: Missing email or password");
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await pool.query("SELECT id, name, email FROM users WHERE email = $1 AND password = $2;", [email, password]);
    if (result.rows.length === 0) {
      console.log(`⚠️ [LOGIN] Failed: Invalid credentials for email: ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    console.log(`🔐 [LOGIN] User successfully logged in (PostgreSQL): ${user.name} (${user.email})`);

    res.status(200).json({
      message: "User successfully logged in",
      token: "mock-jwt-token-12345",
      user: user,
    });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
