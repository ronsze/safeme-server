const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app)
const io = require('socket.io')(http)

io.on('connection', function (socket) {
  var roomID = ""

  socket.on('enterRoom', (room) => {
    roomID = room
    socket.join(roomID)
    io.to(roomID).emit("enteredRoom")
    console.log("enter room" + roomID);
  });

  socket.on("sendR1", (r1) => {
    io.to(roomID).emit("sendR1", r1)
    console.log("sendR1");
  });

  socket.on("sendR2", (r2) => {
    io.to(roomID).emit("sendR2", r2)
    console.log("sendR2");
  });
});

const port = process.env.PORT || 8000 //http default port

app.listen(port, function () {
  console.log("HTTP server listening on port " + port);
});