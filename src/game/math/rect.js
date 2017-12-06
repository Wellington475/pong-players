'use strict'

const Vector = require('./vector')

class Rect extends Vector {
  constructor(x, y, width, height) {
    super(x, y)
    this.width = width
    this.height = height
  }
}

module.exports = Rect
