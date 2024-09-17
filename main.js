const express = require('express')
const app = express()
const http = require('http').Server(app) 
const io = require('socket.io')(http)

app.get("/", function(req, res) {
  res.send("Hello World");
})

io.on('connection', function (socket) {
  socket.roomID = ""
  console.log("connect");
 
  socket.on('enterRoom', (roomID) => {
    socket.roomID = roomID
    socket.join(roomID)
    socket.emit("enteredRoom")
  });

  socket.on("sendR1", (r1) => {
    io.to(socket.roomID).emit("sendR1", r1)
  });

  socket.on("sendR2", (r2) => {
    io.to(socket.roomID).emit("sendR2", r2)
  });
});

const port = process.env.PORT || 8000

app.listen(port, function () {
  console.log("server listening on port " + port);
});