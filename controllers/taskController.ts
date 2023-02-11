import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import IUserRequest from "../lib/userType";
import prisma from "../prisma/prisma";

export default class TaskController {
  async getAllTasks(req: IUserRequest, res: Response) {
    const { userID } = req.userID as JwtPayload;
    try {
      const task = await prisma.tasks.findMany({
        where: {
          userId: userID,
        },
      });

      res.json(task);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async createTask(req: IUserRequest, res: Response) {
    const { userID } = req.userID as JwtPayload;
    const { name, completed } = req.body;
    try {
      const task = await prisma.tasks.create({
        data: {
          name: name,
          completed: completed,
          userId: userID,
        },
      });

      res.status(200).json(task);
    } catch (err) {
      res.status(401).json({
        error: err,
      });
    }
  }

  async updateTask(req: IUserRequest, res: Response) {
    const { userID } = req.userID as JwtPayload;
    const { completed } = req.body;
    const { id } = req.params;
    try {
      await prisma.tasks.updateMany({
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
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async deleteTask(req: IUserRequest, res: Response) {
    const { userID } = req.userID as JwtPayload;
    const { id } = req.params;
    try {
      await prisma.tasks.deleteMany({
        where: {
          id: id,
          userId: userID,
        },
      });

      res.status(200).json({
        message: "Task Deleted Successfully",
      });
    } catch (error) {
      res.status(401).json({
        error,
      });
    }
  }
}
