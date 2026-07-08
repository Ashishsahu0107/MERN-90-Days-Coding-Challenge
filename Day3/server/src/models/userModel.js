const pool = require("../config/db");

const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const createUser = async (name, email) => {
  await pool.query(
    "INSERT INTO users(name, email) VALUES($1, $2)",
    [name, email]
  );
};

module.exports = {
  getAllUsers,
  createUser,
};