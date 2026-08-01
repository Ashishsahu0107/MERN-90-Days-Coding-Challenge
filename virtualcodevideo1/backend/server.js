import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import User from "./models/user.model.js";
import connectDB from "./config/db.config.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/",userRouter)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
});
