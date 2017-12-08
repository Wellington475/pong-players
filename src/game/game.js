'use strict'

const Timer      = require('./utils/timer')
const KeyBoard   = require('./utils/keyboard')
const TouchBoard = require('./utils/touchboard')

const {constrain, mapScale, isMobile} = require('./utils/tools')

const inputKey   = new KeyBoard()
const inputTouch = new TouchBoard()

/**
 * Game - Create a game on the client side
 * @constructor
 * @param {Player}            player    The player   object
 * @param {Player}            opponent  The opponent object
 * @param {HTMLCanvasElement} player    The canvas HTMLCanvasElement
 * @param {Window}            container The window object
 */
class Game {
  constructor(player, opponent, canvasElement, context, container) {
    this.player   = player
    this.opponent = opponent
    this.canvas   = canvasElement
    this.ctx      = context
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
     }, 1000/180)
  }

  setUp(){
    this.canvas.width  = this.window.innerWidth
    this.canvas.height = this.window.innerHeight

    this.player.x   = (this.canvas.width/2) - (this.player.width/2)
    this.opponent.x = (this.canvas.width/2) - (this.opponent.width/2)

    this.player.color   = "#09C"
    this.opponent.color = "red"

    if(this.player.type == 1){
      this.player.y   = 20
      this.opponent.y = this.canvas.height - this.opponent.height - 20
    }

    if(this.player.type == 2){
      this.player.y   = this.canvas.height - this.player.height - 20
      this.opponent.y = 20
    }

    this.window.addEventListener('resize', (event) => {
      this.canvas.width  = this.window.innerWidth
      this.canvas.height = this.window.innerHeight

      if(this.player.type == 1){
        this.player.y   = 20
        this.opponent.y = this.canvas.height - this.opponent.height - 20
      }

      if(this.player.type == 2){
        this.player.y   = this.canvas.height - this.player.height - 20
        this.opponent.y = 20
      }
    })

    inputKey.addMapping(37, (state) => {
      this.player.dir = (state ? -1 : 0)
    })

    inputKey.addMapping(39, (state) => {
      this.player.dir = (state ? 1 : 0)
    })

    inputKey.listenTo(this.window)

    inputTouch.listenTo(this.window)

    this.timer.start(this.ctx)
  }

  stop(){
    console.log('Stop game')
    this.timer.stop()
  }

  update(deltaTime){
    inputTouch.on((data) => {
      let  x = 1 * deltaTime * data.offset.x
      if(!isNaN(x)){
        this.player.x += x
        this.player.x = constrain(this.player.x, 0, this.canvas.width - this.player.width)
      }
    })

    this.player.update(deltaTime)

    this.player.x = constrain(this.player.x, 0, this.canvas.width - this.player.width)

    let player = {
      x: this.player.x,
      id: this.player.id,
      maxWidth: (this.canvas.width - this.player.width)
    }

    this.player.socket.emit('player:update', player)

    this.player.socket.on('opponent:update', (data) => {
      if(data != null && data.id === this.opponent.id){
        if(data.x != this.player.x)
          this.opponent.x = data.x
      }
      this.opponent.x = mapScale(this.opponent.x, 0, data.maxWidth, 0, (this.canvas.width - this.opponent.width))
      this.opponent.x = constrain(this.opponent.x, 0, (this.canvas.width - this.opponent.width))
    })
  }

  draw(){
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.player.show(this.ctx)
    this.opponent.show(this.ctx)
  }
}

module.exports = Game
