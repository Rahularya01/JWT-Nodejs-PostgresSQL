"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN, function (err, userID) {
            if (err)
                return res.status(403).json({ message: "Invalid Token!" });
            req.userID = userID;
            next();
        });
    }
    else {
        res.status(401).json({
            message: "You are not Authenticated",
        });
    }
};
exports.default = verifyToken;
