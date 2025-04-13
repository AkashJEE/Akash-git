const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let birdTop = 100;
let gravity = 2;
let isGameOver = false;
let score = 0;

document.addEventListener("keydown", () => {
  if (!isGameOver) {
    birdTop -= 40;
  }
});

function createPipe() {
  const pipeGap = 150;
  const pipeTopHeight = Math.floor(Math.random() * 200) + 50;
  const pipeBottomHeight = 600 - pipeTopHeight - pipeGap;
  const pipeX = 400;

  const pipeTop = document.createElement("div");
  pipeTop.classList.add("pipe", "pipe-top");
  pipeTop.style.height = pipeTopHeight + "px";
  pipeTop.style.left = pipeX + "px";

  const pipeBottom = document.createElement("div");
  pipeBottom.classList.add("pipe", "pipe-bottom");
  pipeBottom.style.height = pipeBottomHeight + "px";
  pipeBottom.style.left = pipeX + "px";

  gameContainer.appendChild(pipeTop);
  gameContainer.appendChild(pipeBottom);

  let moveInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(moveInterval);
      pipeTop.remove();
      pipeBottom.remove();
      return;
    }

    let pipeLeft = parseInt(pipeTop.style.left);
    pipeTop.style.left = pipeLeft - 2 + "px";
    pipeBottom.style.left = pipeLeft - 2 + "px";

    
    if (
      pipeLeft < 130 && pipeLeft > 70 &&
      (birdTop < pipeTopHeight || birdTop > pipeTopHeight + pipeGap)
    ) {
      gameOver();
    }

  
    if (pipeLeft === 70) {
      score++;
      scoreDisplay.textContent = score;
    }

    
    if (pipeLeft < -60) {
      pipeTop.remove();
      pipeBottom.remove();
    }
  }, 20);
}

function gameOver() {
  isGameOver = true;
  alert("Game Over! Your score: " + score);
  location.reload();
}

function gameLoop() {
  if (isGameOver) return;

  birdTop += gravity;
  bird.style.top = birdTop + "px";

  if (birdTop > 570 || birdTop < 0) {
    gameOver();
  }
}

setInterval(gameLoop, 20);
setInterval(createPipe, 1500);
