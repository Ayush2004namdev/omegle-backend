import { Socket } from "socket.io";
import http from "http";

import express from 'express';
import { Server } from 'socket.io';
import { UserManager } from "./managers/UserManager.js";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();
const server = http.createServer(http);

const port = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const userManager = new UserManager();

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});


io.on('connection', (socket) => {
  console.log('a user connected');
  userManager.addUser("randomName", socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userManager.removeUser(socket.id);
  })
});

server.listen(port , () => {
    console.log('listening on ' , port);
});