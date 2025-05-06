const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');
const targetCountInput = document.getElementById('targetCount');
const applyBtn = document.getElementById('applyBtn');

let score = 0;
let ctrlPressed = false;
let targets = [];
let currentTargetNumber = 1;
let targetsClicked = 0;

function createTarget(number) {
    const target = document.createElement('div');
    target.className = 'target';
    target.textContent = number;
    target.dataset.number = number;
    gameArea.appendChild(target);
    moveTarget(target);
    return target;
}

function moveTarget(target) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const maxX = gameAreaRect.width - 50;
    const maxY = gameAreaRect.height - 50;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}

function resetGame() {
    score = 0;
    currentTargetNumber = 1;
    targetsClicked = 0;
    scoreBoard.textContent = `Score: 0`;
    setupTargets(parseInt(targetCountInput.value));
}

function showAllTargets() {
    score++;
    targets.forEach(target => {
        target.classList.remove('hidden');
        moveTarget(target);
    });
    scoreBoard.textContent = `Score: ${score}`;
}

function setupTargets(count) {
    while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild);
    }
    targets = [];
    currentTargetNumber = 1;
    targetsClicked = 0;
    score = 0;
    scoreBoard.textContent = `Score: 0`;
    for (let i = 1; i <= count; i++) {
        const target = createTarget(i);
        
        target.addEventListener('mousedown', function(e) {
            if (e.button === 2) {
                e.preventDefault();
                const targetNumber = parseInt(this.dataset.number);
                
                if (targetNumber === currentTargetNumber) {
                    targetsClicked++;
                    currentTargetNumber++;
                    this.classList.add('hidden');
                    if (targetsClicked === targets.length) {
                        currentTargetNumber = 1;
                        targetsClicked = 0;
                        setTimeout(showAllTargets, 500);
                    }
                }
            }
        });
        
        targets.push(target);
    }
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
        resetGame();
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'Control') {
        ctrlPressed = false;
    }
});

applyBtn.addEventListener('click', function() {
    const count = parseInt(targetCountInput.value);
    if (count >= 1 && count <= 20) {
        resetGame();
    } else {
        alert('Please enter a number between 1 and 20');
        targetCountInput.value = 1;
    }
});

resetGame();