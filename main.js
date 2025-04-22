const gameArea = document.getElementById('gameArea');
const target = document.getElementById('target');
const scoreBoard = document.getElementById('scoreBoard');

let score = 0;
let ctrlPressed = false;

function moveTarget() {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const maxX = gameAreaRect.width - target.offsetWidth;
  const maxY = gameAreaRect.height - target.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
}

function resetScore() {
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
}

gameArea.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Control') {
        ctrlPressed = true;
    }

    if (ctrlPressed && e.key === 'j') {
        e.preventDefault();
        resetScore();
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'Control') {
        ctrlPressed = false;
    }
});

target.addEventListener('mousedown', function(e) {
    if (e.button === 2) {
        score++;
        scoreBoard.textContent = `Score: ${score}`;
        moveTarget()
    }
});

// Initial target position
moveTarget();