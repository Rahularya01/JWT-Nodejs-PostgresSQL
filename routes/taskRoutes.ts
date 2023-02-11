import express, { Router } from "express";
import TaskController from "../controllers/taskController";
import verifyToken from "../middlewares/verifyToken";

const router: Router = express.Router();

const taskController = new TaskController();

router.get("/getAllTasks", verifyToken, taskController.getAllTasks);
router.post("/createTask", verifyToken, taskController.createTask);
router.put('/updateTask/:id', verifyToken, taskController.updateTask)
router.delete("/deleteTask/:id", verifyToken, taskController.deleteTask);

export default router;
