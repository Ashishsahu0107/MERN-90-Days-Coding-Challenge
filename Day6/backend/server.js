import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import { initDb } from "./routes/data.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api", userRoute);
app.use("/api", authRoute);

// Swagger Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/hello", (req, res) => {
  res.send("Hello Swagger");
});

const PORT = process.env.PORT || 4500;

// Initialize Database before starting Server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
    console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
  });
}).catch((err) => {
  console.error("❌ Failed to initialize database. Server cannot start.", err);
});