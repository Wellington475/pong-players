'use strict'

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

const Player = require('../game/entities/player')

const rooms        = []
const waiting_room = []
const connections  = []

const getCounter = () => {
  io.emit('getCounter', connections.length)
  console.log("Connections number: " + connections.length + "\n")
}


const createRoom = (playerIdOne, playerIdTwo) => {
  rooms.push({player1: playerIdOne, player2: playerIdTwo})

  let room = rooms[rooms.length - 1]
  room.id  = rooms.length

  io.emit('init', room)

  console.log("\nCreate: Room [" + room.id + "]\n\n\t player1 [" + room.player1.name + "] - player2 [" + room.player2.name + "]\n")

  return room
}

const destroyRoom = (playerId) => {
  const idx  = rooms.findIndex(room => room.player1.id == playerId || room.player2.id == playerId)
  const room = rooms.splice(idx, 1)

  console.log("Destroy: Room[" + (idx + 1) + "]\n")

  return rooms
}

const waitingRoomToRooms = () => {
  const [player2, player1] = [waiting_room.pop(), waiting_room.pop()]
  return createRoom(player1, player2)
}

const otherPlayerToWaitingRoom = (playerId) => {
  return rooms.filter(room => {
      if(room.player1.id == playerId){
        waiting_room.push(room.player2)
        return room.player2
      }

      if(room.player2.id == playerId){
        waiting_room.push(room.player1)
        return room.player2
      }
  })
}

io.on('connection', function(socket) {
  console.log("Connected: " + socket.id)
  connections.push(socket)
  getCounter()

  socket.on('registerName', (name) => {
    const player = new Player(socket.id, name)

    waiting_room.push(player)

    if(waiting_room.length == 2){
      const room = waitingRoomToRooms()
    }
  })


  socket.on('disconnect', function(data){
    console.log("Disconnected: " + socket.id)
    connections.splice(connections.indexOf(socket), 1)
    getCounter()

    otherPlayerToWaitingRoom(socket.id)
    destroyRoom(socket.id)

    console.log(rooms)
    console.log(waiting_room)

    if(waiting_room.length == 2){
      const room = waitingRoomToRooms()
    }
  })
})
