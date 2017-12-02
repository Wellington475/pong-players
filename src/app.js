/**
 * Initial events
 */
const modal = document.querySelector('.modal')

window.addEventListener('keydown', (event) => {
  if(event.keyCode == 27)
    modal.classList.remove('active')
});

window.addEventListener('load', () => modal.classList.add('active'))
