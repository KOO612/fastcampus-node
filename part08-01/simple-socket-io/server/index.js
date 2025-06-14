const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

// A emit => sever on   emit => A, B
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (message) => {
    io.emit("message", `${socket.id.substring(0, 2)} said ${message}`);
    // io.emit("message", `${socket.id} said ${message}`);
  });
});

http.listen(3000, () => {
  console.log("server start");
});
