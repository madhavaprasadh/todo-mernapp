import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authrouter from "./userRoutes/Authroutes.js";
import userrouter from "./userRoutes/Userroutes.js";
import todorouter from "./userRoutes/TodoRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  }),
);

app.use("/api/auth", authrouter);
app.use("/api/user", userrouter);
app.use("/api/todos", todorouter);
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

app.get("/", (req, res) => res.send("API Working"));

app.listen(PORT, () => console.log(`server started on PORT:${PORT}`));
