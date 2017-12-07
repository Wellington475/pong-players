'use strict'

const PRESSED  = 1
const RELEASED = 0

class KeyBoard {
  constructor() {
    this.keyStates = {}
    this.keyMap    = {}
  }

  addMapping(keyCode, callback){
		this.keyMap[keyCode] = callback
	}

  handlerEvent(event){
		const {keyCode} = event

		if(!this.keyMap.hasOwnProperty(keyCode))
			return

		event.preventDefault()

		const keyState = event.type === 'keydown' ? PRESSED : RELEASED

		if(this.keyStates[keyCode] == keyState)
			return

		this.keyStates[keyCode] = keyState
    
		this.keyMap[keyCode](keyState)
	}

  listenTo(window){
		['keydown', 'keyup'].forEach(eventName => {
			window.addEventListener(eventName, event => {
				this.handlerEvent(event)
			})
		})
	}
}

module.exports = KeyBoard
