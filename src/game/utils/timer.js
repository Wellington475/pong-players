'use strict'

class Timer {
  constructor(callbacks, step) {
    this.last      = 0
    this.acc       = 0
    this.tick      = 0
    this.deltaTime = step || 1000/60
    this.frameId   = null
    this.callbacks = callbacks
  }

  onFrame(time){
    if(this.last !== null){
      this.acc += (time - this.last)/this.deltaTime;

  		while(this.acc > this.deltaTime){
  			this.callbacks.update(this.deltaTime);
  			this.acc -= this.deltaTime;
  		}
  	}
    this.last = time
    this.callbacks.render()
    this.frameId = requestAnimationFrame((time) => this.onFrame(time))
  }

  start() {
    this.last = null
    this.frameId = requestAnimationFrame((time) => this.onFrame(time))
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }
}

module.exports = Timer
