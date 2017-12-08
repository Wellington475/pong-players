'use strict'

const Vector = require('../math/vector')

class TouchBoard {
  constructor() {
    this.moving      = false
    this.offset      = null
    this.globalTouch = null
    this.callback    = null
  }

  on(callback){
    this.callback = callback
  }

  listenTo(window){
    window.addEventListener('touchstart', (event) => {
      event.preventDefault()

      let touch = event.touches[0] || event.targetTouches[0]
      this.globalTouch = new Vector(touch.pageX, touch.pageY)
    })

    window.addEventListener('touchmove', (event) => {
      event.preventDefault()

      this.moving = true

      let touch   = event.touches[0] || event.targetTouches[0]
      this.offset = new Vector(touch.pageX - this.globalTouch.x, touch.pageY - this.globalTouch.y)

      this.callback({moving: this.moving, offset: {x: this.offset.x / Math.abs(this.offset.x),
                                                   y: this.offset.y / Math.abs(this.offset.y)}})
    })

    window.addEventListener('touchmove', (event) => {
      event.preventDefault()

      this.moving = false

      this.callback({moving: this.moving, offset: {x: 0, y: 0}})
    })
	}
}

module.exports = TouchBoard
