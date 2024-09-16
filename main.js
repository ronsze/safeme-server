const express = require('express');
const https = require('https');
const app = express();
const io = require('socket.io')(https);

io.on('connection', function (socket) {
  var roomID = ""
  socket.emit("connect")

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

const port = process.env.PORT || 8000 //http default port

app.listen(port, function () {
  console.log("HTTP server listening on port " + port);
});