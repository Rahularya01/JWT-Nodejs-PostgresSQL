import express, { Router } from "express";
import UserController from "../controllers/userController";
import verifyToken from "../middlewares/verifyToken";

const router: Router = express.Router();

const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", verifyToken, userController.profile);

export default router;
