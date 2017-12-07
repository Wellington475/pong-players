'use strict'

const Timer  = require('./utils/timer')

/**
 * Game - Create a game on the client side
 * @constructor
 * @param {Player}            player    The player   object
 * @param {Player}            opponent  The opponent object
 * @param {HTMLCanvasElement} player    The canvas HTMLCanvasElement
 * @param {Window}            container The window object
 */
class Game {
  constructor(player, opponent, canvasElement, container) {
    this.player   = player
    this.opponent = opponent
    this.canvas   = canvasElement
    this.window   = container

    const self = this

    /**
     * The loop game
     * @type {Timer}
     */
     this.timer = new Timer({
       update: (deltaTime) => {
         self.update(deltaTime)
       },
       render: () => {
         self.draw()
       }
     })
  }

  setUp(){
    this.canvas.width  = this.window.innerWidth
    this.canvas.height = this.window.innerHeight

    this.timer.start()
  }

  stop(){
    console.log('Stop game')
    this.timer.stop()
  }

  update(deltaTime){
    console.log('Updating game', deltaTime)
  }

  draw(){
    console.log('Drawing game')
  }
}

module.exports = Game
