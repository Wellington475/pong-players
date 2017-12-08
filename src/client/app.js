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
      let {player1, player2} = room
      player   = new Player(player1.id, player1.name)
      opponent = new Player(player2.id, player2.name)

      player.type   = 1
      player.roomId = room.id

      opponent.type   = 2
      opponent.roomId = room.id

      document.querySelector('.nick-one').innerHTML = '<p class="nick me">'       + player.name   + ' <sup class="score score-me">0</sup></p>'
      document.querySelector('.nick-two').innerHTML = '<p class="nick opponent">' + opponent.name + ' <sup class="score score-me">0</sup></p>'
    }
    else{
      let {player1, player2} = room
      player   = new Player(player2.id, player2.name)
      opponent = new Player(player1.id, player1.name)

      player.type   = 2
      player.roomId = room.id

      opponent.type   = 1
      opponent.roomId = room.id

      document.querySelector('.nick-one').innerHTML = '<p class="nick opponent">' + opponent.name + ' <sup class="score score-me">0</sup></p>'
      document.querySelector('.nick-two').innerHTML = '<p class="nick me">'       + player.name   + ' <sup class="score score-me">0</sup></p>'
    }

    player.socket = socket

    game = new Game(player, opponent, document.querySelector('#canvas'), document.querySelector('#canvas').getContext('2d'), window)
    game.setUp()
  }
})
