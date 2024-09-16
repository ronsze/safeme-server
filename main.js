const express = require('express');
const https = require('https');
const app = express();
const server = https.createServer(app)

var io = require('socket.io')(server, { secure: true });

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

const port = process.env.PORT || 5000 //http default port

app.listen(port, function () {
  console.log("HTTPS server listening on port " + port);
});