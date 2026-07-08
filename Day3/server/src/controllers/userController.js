const pool = require("../config/db.js");

const getUsers = async (req, res) => {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
};

const addUser = async (req, res) => {
    const { name, email } = req.body;

    await pool.query(
        "INSERT INTO users(name,email) VALUES($1,$2)",
        [name, email]
    );

    res.json({
        message: "User Added"
    });
};

module.exports = {
    getUsers,
    addUser,
};