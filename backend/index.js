const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const cors = require("cors");
const router = require("./router");

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
app.use(router);
io.on("connection", (socket) => {
  console.log("새로운 connection이 발생하였습니다.");
  socket.on("disconnect", () => {
    console.log("유저가 떠났어요.");
  });
  socket.on("chat message", (message) => {
    io.emit("chat message", message);
    console.log("서버에서 받은 메세지: ", message);
  });
});
server.listen(PORT, () => console.log(`서버가 ${PORT} 에서 시작되었어요`));
