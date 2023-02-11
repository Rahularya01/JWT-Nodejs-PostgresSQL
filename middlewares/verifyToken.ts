import { Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import IUserRequest from "../lib/userType";

const verifyToken = (req: IUserRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN as Secret, (err, userID) => {
      if (err) return res.status(403).json({ message: "Invalid Token!" });
      req.userID = userID;
      next();
    });
  } else {
    res.status(401).json({
      message: "You are not Authenticated",
    });
  }
};

export default verifyToken;
