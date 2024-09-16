const express = require('express');
const app = express();
const https = require('http').Server(app);
const io = require('socket.io')(https);

app.get("/", function(req, res) {
  console.log("Hello");
  res.send("Hello World");
})

io.on('connection', function (socket) {
  var roomID = ""
  socket.emit("connect")
  console.log("connecte");

  socket.on('enterRoom', (room) => {
    roomID = room
    socket.join(roomID)
    socket.emit("enteredRoom")
  });

  socket.on("sendR1", (r1) => {
    io.to(roomID).emit("sendR1", r1)
  });

  socket.on("sendR2", (r2) => {
    io.to(roomID).emit("sendR2", r2)
  });
});

const port = process.env.PORT || 8000

app.listen(port, function () {
  console.log("HTTPS server listening on port " + port);
});