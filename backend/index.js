import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //user online scope
  console.log(`New Socket Connected : ${socket.id}`);

  //define various events
  socket.on("join_room", (data) => {
    //data is the roomID or name of the room that socket wished to join
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
server.listen(3001, () => {
  console.log("Server Running !");
});
