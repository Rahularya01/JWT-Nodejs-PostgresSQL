"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(userRoutes_1.default);
app.use(taskRoutes_1.default);
exports.default = app;
