const path=require("path");
const express = require("express");
var app = express();
const port=process.env.PORT||4000;
var server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  //app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("join_room", (data) => {
    console.log("Room is", data);
    socket.join(data.room);
    console.log("user joined");
    socket.broadcast.emit("recieve_message", {
      name: data.name,
      message: `A new user ${data.name} joined the room ${data.room}`,
      side: "center",
    });
  });
  socket.on("send_message", (data) => {
    console.log("Data is", data);
    socket.to(data.room).emit("recieve_message", data);
  });
});
// app.listen(4000, () => {
//   console.log("server running on port 4000");
// });
