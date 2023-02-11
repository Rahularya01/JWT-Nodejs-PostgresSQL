"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../controllers/userController"));
var verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
var router = express_1.default.Router();
var userController = new userController_1.default();
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", verifyToken_1.default, userController.profile);
exports.default = router;
