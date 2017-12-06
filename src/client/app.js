/**
 * Initial events
 */
const modal = document.querySelector('.modal')

window.addEventListener('keydown', (event) => {
  if(event.keyCode == 27)
    modal.classList.remove('active')
});

window.addEventListener('load', () => modal.classList.add('active'))

/**
 * Socket events
 */

const socket = io();
socket.on('getCounter', (count) => {
  document.title = "Pong-Players (" + count + ")"
})

socket.on('init', (room) => {
  if(socket.id == room.player1)
    console.log("Room[" + room.id + "] Player 1");

  if(socket.id == room.player2)
    console.log("Room[" + room.id + "] Player 2");
})
