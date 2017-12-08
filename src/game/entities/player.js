'use strict'

const Rect = require('../math/rect')

class Player extends Rect {
  constructor(id, name) {
    super(20, 20, 150, 20)

    this.socket = null
    this.id     = id
    this.roomId = null

    this.name  = name
    this.score = 0
    this.color = "#fff"
    this.dir   = 0
    this.type  = 1
  }

  update(deltaTime){
    this.x += 2 * deltaTime * this.dir
  }

  show(context){
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  toString(){
    return this.name
  }
}

module.exports = Player
