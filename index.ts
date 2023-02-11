import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(taskRoutes);

export default app;
