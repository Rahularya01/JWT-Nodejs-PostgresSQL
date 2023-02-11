"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma/prisma"));
class TaskController {
    getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.userID;
            try {
                const task = yield prisma_1.default.tasks.findMany({
                    where: {
                        userId: userID,
                    },
                });
                res.json(task);
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.userID;
            const { name, completed } = req.body;
            try {
                const task = yield prisma_1.default.tasks.create({
                    data: {
                        name: name,
                        completed: completed,
                        userId: userID,
                    },
                });
                res.status(200).json(task);
            }
            catch (err) {
                res.status(401).json({
                    error: err,
                });
            }
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.userID;
            const { completed } = req.body;
            const { id } = req.params;
            try {
                yield prisma_1.default.tasks.updateMany({
                    data: {
                        completed: completed,
                    },
                    where: {
                        id: id,
                        userId: userID,
                    },
                });
                res.json({
                    message: "Task has been updated Successfully",
                });
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.userID;
            const { id } = req.params;
            try {
                yield prisma_1.default.tasks.deleteMany({
                    where: {
                        id: id,
                        userId: userID,
                    },
                });
                res.status(200).json({
                    message: "Task Deleted Successfully",
                });
            }
            catch (error) {
                res.status(401).json({
                    error,
                });
            }
        });
    }
}
exports.default = TaskController;
