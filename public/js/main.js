/**
 * modal
 */
const modal      = document.querySelector('.modal');
const btnModal   = document.querySelector('.modal-btn');
const inputModal = document.querySelector('.modal-input');

btnModal.addEventListener('click', (event) => {
  event.preventDefault();

  if(inputModal.value != "")
    modal.classList.remove('active');
  else
    inputModal.style.borderColor = "red";
});

window.addEventListener('load', (event) => {
  modal.classList.add('active');
});

/**
 * Game
 */
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
