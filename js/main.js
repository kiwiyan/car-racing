var start = null
var element = document.querySelector('.ball')
element.style.position = 'absolute'

function step (timestamp) {
  console.log('t:', timestamp)
  if (!start) start = timestamp
  var progress = timestamp - start
  element.style.left = Math.min(progress / 10, 200) + 'px'
  if (progress < 2000) {
    window.requestAnimationFrame(step)
  }
}

window.requestAnimationFrame(step)
