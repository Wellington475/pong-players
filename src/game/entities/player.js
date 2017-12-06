'use strict'

const Rect = require('../math/rect')

class Player extends Rect {
  constructor(id, name) {
    super(10, 10, 10, 100)
    this.id   = id
    this.name = name
  }

  toString(){
    return this.name
  }
}

module.exports = Player
