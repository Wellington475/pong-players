'use strict'

/**
 * Initial events
 */

const socket = io()

const Game      = require('../game/game')
const Player    = require('../game/entities/player')
const KeyBoard  = require('../game/utils/keyboard')
const input     = new KeyBoard()

let game     = new Game()
let player   = new Player()
let opponent = new Player()

input.listenTo(window)

input.addMapping(27, (state) => {
  if(state)
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

socket.on('gameEnd', function(player){
  if(socket.id == player.id){
      document.querySelector('.warning').classList.add('show')
      document.querySelector('.message').innerHTML = "You win!<br>Waiting for opponent"
      document.querySelector('.modal').classList.add('active')

      game.stop()
  }
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

    game = new Game(player, opponent, document.querySelector('#canvas'), window)
    game.setUp()
  }
})
