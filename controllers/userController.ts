import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import IUserRequest from "../lib/userType";

export default class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign(
        { userID: user.id },
        process.env.JWT_TOKEN as Secret
      );

      res.status(200).json({ token });
    } catch (err) {
      res.status(400).json({ message: "User already Exists" });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) return res.status(400).json({ message: "User not found" });

      const passwordMatch = await bcrypt.compare(
        password,
        user?.password as any
      );

      if (!passwordMatch)
        return res.status(400).json({ message: "Invalid Password" });

      const token = jwt.sign(
        { userID: user?.id },
        process.env.JWT_TOKEN as Secret
      );

      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: "Something Went Wrong" });
    }
  }

  async profile(req: IUserRequest, res: Response) {
    const { userID } = req.userID as JwtPayload;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userID,
        },
      });

      if (!user) {
        return res.status(400).json({
          message: "User Not Found",
        });
      }

      const { id, name, email } = user;
      res.status(200).json({ id, name, email });
      
    } catch (error) {
      res.status(401).json({
        message: "Something Went Wrong",
      });
    }
  }
}
