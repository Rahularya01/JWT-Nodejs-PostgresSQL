import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", taskRoutes);

app.listen(3001, () => {
  console.log("Server running on 3001");
});

export default app;
