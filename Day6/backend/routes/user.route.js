import express from "express";
import { pool } from "./data.js";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email FROM users ORDER BY id ASC;");
    console.log(`\n🔍 [GET /api/users] Sending list of ${result.rows.length} users`);
    console.log("📊 User Database in Backend (PostgreSQL):");
    console.table(result.rows);
    console.log("\n");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const result = await pool.query("SELECT id, name, email FROM users WHERE id = $1;", [userId]);
    
    if (result.rows.length === 0) {
      console.log(`⚠️ [GET /api/users/${userId}] User not found`);
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`🔍 [GET /api/users/${userId}] Sending details for user: ${result.rows[0].name}`);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request or user already exists
 */
router.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    console.log("⚠️ [POST /api/users] Creation failed: Missing fields");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check existing email
    const checkEmail = await pool.query("SELECT id FROM users WHERE email = $1;", [email]);
    if (checkEmail.rows.length > 0) {
      console.log(`⚠️ [POST /api/users] Creation failed: Email ${email} already exists`);
      return res.status(400).json({ message: "User already exists" });
    }

    // Insert new user
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email;",
      [name, email, password]
    );
    
    const newUser = result.rows[0];

    // Fetch all users to display updated table
    const allUsers = await pool.query("SELECT id, name, email FROM users ORDER BY id ASC;");

    console.log(`\n👤 [CREATE] Naya user add hua (PostgreSQL): ${newUser.name} (${newUser.email})`);
    console.log("📊 Updated User Database in Backend:");
    console.table(allUsers.rows);
    console.log("\n");

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ashish Updated
 *               email:
 *                 type: string
 *                 example: ashish.updated@example.com
 *     responses:
 *       200:
 *         description: User successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email } = req.body;

  try {
    // Check user exists
    const userCheck = await pool.query("SELECT id, name, email FROM users WHERE id = $1;", [userId]);
    if (userCheck.rows.length === 0) {
      console.log(`⚠️ [PUT /api/users/${userId}] Update failed: User not found`);
      return res.status(404).json({ message: "User not found" });
    }

    const currentName = name || userCheck.rows[0].name;
    const currentEmail = email || userCheck.rows[0].email;

    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email;",
      [currentName, currentEmail, userId]
    );
    const updatedUser = result.rows[0];

    console.log(`✏️ [UPDATE] User ID ${userId} updated to: ${updatedUser.name} (${updatedUser.email})`);
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.delete("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    // Find user
    const userCheck = await pool.query("SELECT name, email FROM users WHERE id = $1;", [userId]);
    if (userCheck.rows.length === 0) {
      console.log(`⚠️ [DELETE /api/users/${userId}] Delete failed: User not found`);
      return res.status(404).json({ message: "User not found" });
    }
    
    const deletedUser = userCheck.rows[0];
    await pool.query("DELETE FROM users WHERE id = $1;", [userId]);

    // Fetch all users to display updated table
    const allUsers = await pool.query("SELECT id, name, email FROM users ORDER BY id ASC;");

    console.log(`\n❌ [DELETE] User successfully deleted from database: ${deletedUser.name} (${deletedUser.email})`);
    console.log("📊 Updated User Database in Backend:");
    console.table(allUsers.rows);
    console.log("\n");

    res.json({ message: "User successfully deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;