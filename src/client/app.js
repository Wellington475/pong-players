'use strict'

/**
 * Initial events
 */
const socket = io()
const Player = require('../game/entities/player')

let player   = new Player()
let opponent = new Player()

window.addEventListener('keydown', (event) => {
  if(event.keyCode == 27)
    document.querySelector('.modal').classList.remove('active')
})

window.addEventListener('load', () => document.querySelector('.modal').classList.add('active'))

/**
 * Socket events
 */

document.querySelector('.modal-btn').addEventListener('click', (event) => {
  socket.emit('registerName', document.querySelector('.modal-input').value)

  document.querySelector('.modal-input').value = ""
  document.querySelector('.default').classList.add('hidden')
  document.querySelector('.warning').classList.add('show')
})

socket.on('getCounter', (count) => {
  document.title = "Pong-Players (" + count + ")"
})

socket.on('init', (room) => {
  if(socket.id == room.player1.id || socket.id == room.player2.id){
    document.querySelector('.modal').classList.remove('active')

    if(socket.id == room.player1.id){
      player   = room.player1
      opponent = room.player2

      document.querySelector('.me').innerText       = player.name
      document.querySelector('.opponent').innerText = opponent.name
    }
    else{
      player   = room.player1
      opponent = room.player2

      document.querySelector('.me').innerText       = player.name
      document.querySelector('.opponent').innerText = opponent.name
    }

    console.log("Room[" + room.id + "] " + player.name + " x " + opponent.name)
  }
})
