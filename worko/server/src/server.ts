import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connect from "./config/conn";
import authRouter from "./routes/auth.route";
import router from "./routes/user.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/auth", authRouter);
app.use("/api", router);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
