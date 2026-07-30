import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.model.js";
const app = express();

app.use(cors());
app.use(express.json());
const mongoURL =
  "mongodb+srv://ashishsahu172005_db_user:Ashishsahu1232005@cluster0.yjizpqy.mongodb.net/ashishsahu";
const port = 8000;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("mongodb connected");
  } catch (error) {
    console.log("database error ");
  }
};

app.get("/", (req, res) => {
  res.json({ name: "Ashish", age: 20 });
});


app.post("/create", async (req, res) => {
  try {
      const { name, age, username, email, password } = req.body;

      const newUser = await User.create({
          name,
          age,
          username,
          email,
          password
      })

      return res.status(201).json({message: "user created"})
  } catch (error) {
    return res.status(400).json({message:error})
  }
});

app.listen(port, () => {
  console.log(`server is started ${port}`);
  connectDB();
});
