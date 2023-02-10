import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);

app.listen(3001, () => {
  console.log("Server Running on PORT 3001");
});
