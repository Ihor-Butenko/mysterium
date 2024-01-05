"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const connection_1 = require("./modules/connection");
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
io.on('connection', connection_1.onConnected);
server.listen(process.env.PORT || 4040, () => {
    console.log('http://localhost:4040');
});
exports.default = io;
