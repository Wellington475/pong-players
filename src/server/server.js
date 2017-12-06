/**
 * Server config
 */

const express = require('express')
const app     = express()

const server = app.listen(4242, '0.0.0.0', () => {
  let port = server.address().port

  console.log('\n\tListening at http://localhost:' + port+ '\n\n')
})

app.use(express.static('public'))

/**
 * Socket config
 */
const socket = require('socket.io')
const io     = socket(server)

const rooms = []
const waiting_room = [];
const connections = [];

const getCounter = () => {
  io.emit('getCounter', connections.length)
  console.log("Connections number: " + connections.length + "\n")
}


const createRoom = (playerIdOne, playerIdTwo) => {
  const roomId = rooms.length+1
  rooms.push({id: roomId, player1: playerIdOne, player2: playerIdTwo})
  return rooms.map(room => {
      if(room.id == roomId){
        io.emit('init', room);

        console.log("\nRoom ["+room.id+"]:\n\n\t player1 [" + room.player1 + "] - player2 [" + room.player2 + "]\n")

        return room
      }
    })
}

io.on('connection', function(socket){
  console.log("Connected: " + socket.id)

  connections.push(socket)
  waiting_room.push(socket.id)

  if(waiting_room.length == 2){
    const [player1, player2] = [waiting_room.pop(), waiting_room.pop()]
    const roomId = createRoom(player1, player2)
  }

  getCounter()

  socket.on('disconnect',function(data){
    connections.splice(connections.indexOf(socket), 1)
    for(let i in rooms){
      if(rooms[i].player1 == socket.id || rooms[i].player2 == socket.id){
        waiting_room.push(rooms[i].player1 == socket.id ? rooms[i].player2 : rooms[i].player1)
        rooms.splice(i, 1)
      }
    }
    console.log("Disconnected: " + socket.id)
    console.log("Rooms: " + rooms + "\n")
    getCounter()

    if(waiting_room.length == 2){
      const [player1, player2] = [waiting_room.pop(), waiting_room.pop()]
      const roomId = createRoom(player1, player2)
    }
  })
})
