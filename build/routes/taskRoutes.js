"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = __importDefault(require("../controllers/taskController"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = express_1.default.Router();
const taskController = new taskController_1.default();
router.get("/getAllTasks", verifyToken_1.default, taskController.getAllTasks);
router.post("/createTask", verifyToken_1.default, taskController.createTask);
router.put('/updateTask/:id', verifyToken_1.default, taskController.updateTask);
router.delete("/deleteTask/:id", verifyToken_1.default, taskController.deleteTask);
exports.default = router;
