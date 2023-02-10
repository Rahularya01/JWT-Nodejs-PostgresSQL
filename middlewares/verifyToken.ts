import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN as Secret);
    // @ts-ignore: Unreachable code error
    req.userID = verified;
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default verifyToken;
