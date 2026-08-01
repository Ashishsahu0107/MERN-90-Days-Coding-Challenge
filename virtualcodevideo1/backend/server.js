import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database Error:", error.message);
  }
};

app.get("/", (req, res) => {
  res.json({ name: "Ashish", age: 20 });
});

app.post("/create", async (req, res) => {
  try {
    const { name, age, username, email, password } = req.body;

    await User.create({
      name,
      age,
      username,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User created",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
});