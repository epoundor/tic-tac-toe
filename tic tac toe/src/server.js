import { createServer } from "http";
import { Server } from "socket.io";
const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "http://192.168.100.239:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user is connected");
  socket.emit("hello", "youtube tutorial");

  socket.on("makeMove", (board) => {
    console.log("make Move");
    io.emit("makeMove", board);
  });
  socket.on("resetGame", (board) => {
    console.log("reset Game");
    io.emit("resetGame", board);
  });
});

server.listen(3000);
