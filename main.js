const express = require('express')
const app = express()
const server = require('http').Server(app) 
const io = require('socket.io')(server) 

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
});

const port = process.env.PORT || 8000

server.listen(port, function () {
  console.log("server listening on port " + port);
});