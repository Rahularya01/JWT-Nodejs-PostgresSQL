import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";


export default interface IUserRequest extends Request {
  userID?: JwtPayload | undefined | string;
}
