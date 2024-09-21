const express = require('express')
const app = express()
const server = require('http').Server(app) 
const io = require('socket.io')(server) 

app.get("/", function(req, res) {
  res.send("Hello World");
})

io.on('connection', function (socket) {
  socket.on('enterRoom', (name, roomID) => {
    socket.name = name
    socket.join(roomID)
    socket.emit("enteredRoom")
  });

  socket.on('guard_id', (id) => {
    socket.to(getRoom(socket)).emit("guard_id", id)
  })
});

function getRoom(socket) {
  const rooms = [...socket.rooms]
  return rooms.filter(item => item !== socket.id)[0]
}

const port = process.env.PORT || 8000

server.listen(port, function () {
  console.log("server listening on port " + port);
});