let scored = 0;
let topScore = 0;
let lastHole;
let timeUp = false;
let timeLeft = 30;
let countdown;

const scoredDisplay = document.getElementById('scored');
const topScoreDisplay = document.getElementById('top-scorer');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) return randomHole(holes);
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 2000);
    const hole = randomHole(holes);
    hole.querySelector('.mole').classList.add('up');
    setTimeout(() => {
        hole.querySelector('.mole').classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scored = 0;
    timeLeft = 30;
    timeUp = false;
    scoredDisplay.textContent = scored;
    timerDisplay.textContent = timeLeft;
    startButton.disabled = true;
    gameOverScreen.classList.add('hidden');
    peep();

    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timeUp = true;
            startButton.disabled = false;
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    gameOverScreen.classList.remove('hidden');
    finalScoreDisplay.textContent = scored;
    if (scored > topScore) {
        topScore = scored;
        topScoreDisplay.textContent = topScore;
    }
}

function whack(event) {
    if (!event.isTrusted) return;
    scored++;
    this.classList.remove('up');
    scoredDisplay.textContent = scored;
}

// Event Listeners
moles.forEach(mole => mole.addEventListener('click', whack));
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
