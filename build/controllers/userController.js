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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../prisma/prisma"));
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            try {
                const user = yield prisma_1.default.user.create({
                    data: {
                        name: name,
                        email: email,
                        password: hashedPassword,
                    },
                });
                const token = jsonwebtoken_1.default.sign({ userID: user.id }, process.env.JWT_TOKEN);
                res.status(200).json({ token });
            }
            catch (err) {
                res.status(400).json({ message: "This email have a existing account" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        email: email,
                    },
                });
                if (!user)
                    return res.status(400).json({ message: "User not found" });
                const passwordMatch = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
                if (!passwordMatch)
                    return res.status(400).json({ message: "Invalid Password" });
                const token = jsonwebtoken_1.default.sign({ userID: user === null || user === void 0 ? void 0 : user.id }, process.env.JWT_TOKEN);
                res.status(200).json({ token });
            }
            catch (error) {
                res.status(400).json({ message: "Something Went Wrong" });
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.userID;
            try {
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        id: userID,
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                });
                if (!user) {
                    return res.status(400).json({
                        message: "User Not Found",
                    });
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(401).json({
                    message: "Something Went Wrong",
                });
            }
        });
    }
}
exports.default = UserController;
