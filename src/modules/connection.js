"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnected = void 0;
const app_1 = __importDefault(require("../app"));
const socketConnected = new Set();
const onConnected = (socket) => {
    console.log(socket.id);
    socketConnected.add(socket.id);
    app_1.default.emit('clients-total', socketConnected.size);
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        socketConnected.delete(socket.id);
        app_1.default.emit('clients-total', socketConnected.size);
    });
    socket.on("incoming-message", (data) => {
        socket.broadcast.emit('chat-message', data);
    });
    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data);
    });
};
exports.onConnected = onConnected;
