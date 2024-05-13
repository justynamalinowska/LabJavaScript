let startTime;
let endTime;
let gameTime;
let points;

const startModal = document.getElementById("startModal");
const startButton = document.getElementById("startButton");
const summaryModal = document.getElementById("summaryModal");
const tryAgainButton = document.getElementById("tryAgainButton");
const timeElement = document.getElementById("time");
const timerElement = document.getElementById("timer");
const menuPoints = document.getElementById("menuPoints");
const summaryPoints = document.getElementById("summaryPoints");
const menu = document.getElementById("menu");

let holeX;
let holeY;
let ballX;
let ballY;
let ballSpeedX = 0;
let ballSpeedY = 0;
let containerWidth;
let containerHeight;

document.getElementById("endGame").addEventListener("click", function () {
  endGame();
});

window.addEventListener("DOMContentLoaded", function () {
  startModal.classList.add("visible");

  startButton.addEventListener("click", function () {
    startModal.classList.remove("visible");
    startNewGame();
  });

  tryAgainButton.addEventListener("click", function () {
    summaryModal.classList.remove("visible");
    startNewGame();
  });

  //   startButton.addEventListener("click", startAnimationLoop);
  //   tryAgainButton.addEventListener("click", startAnimationLoop);
});

window.addEventListener("deviceorientation", handleOrientation);

function handleOrientation(event) {
  ballSpeedX = event.gamma / 40;
  ballSpeedY = event.beta / 40;
}

function startNewGame() {
  points = 0;
  menuPoints.innerText = points;
  menu.classList.remove("hidden");
  startTimer();
  startAnimationLoop();
  const gameContainer = document.getElementById("gameContainer");
  const containerRect = gameContainer.getBoundingClientRect();
  containerWidth = containerRect.width;
  containerHeight = containerRect.height;
  startTime = new Date();

  ballX = containerWidth / 2;
  ballY = containerHeight / 2;
  randomizePositions();
}

function startAnimationLoop() {
  requestAnimationFrame(update);
}

function update() {
  const newBallX = ballX + ballSpeedX;
  const newBallY = ballY + ballSpeedY;

  if (
    newBallX >= 15 &&
    newBallX <= containerWidth - 15 &&
    newBallY >= 15 &&
    newBallY <= containerHeight - 15
  ) {
    ballX = newBallX;
    ballY = newBallY;
  }
  const ballElement = document.querySelector(".ball");
  ballElement.style.left = `${ballX}px`;
  ballElement.style.top = `${ballY}px`;

  if (isBallInHole()) nextRound();
  else requestAnimationFrame(update);
}

function randomizePositions() {
  randomizeHole();
  randomizeBall();
}

function endGame() {
  menu.classList.add("hidden");
  endTime = new Date();
  gameTime = endTime - startTime;
  summaryPoints.innerText = points;
  summaryModal.classList.add("visible");

  const minutes = Math.floor(gameTime / 60000);
  const seconds = Math.floor((gameTime % 60000) / 1000);
  timeElement.innerText = `${minutes} min ${seconds} sec`;
}

function nextRound() {
  points++;
  menuPoints.innerText = points;
  if (points >= 5) endGame();
  else {
    randomizePositions();
    requestAnimationFrame(update);
  }
}

function randomizeHole() {
  do {
    holeX = Math.random() * (containerWidth - 54) + 27;
    holeY = Math.random() * (containerHeight - 54) + 27;
  } while (holeX === ballX && holeY === ballY);

  const holeElement = document.querySelector(".hole");
  holeElement.style.left = `${holeX}px`;
  holeElement.style.top = `${holeY}px`;
}

function randomizeBall() {
  const ballElement = document.querySelector(".ball");
  if (points === 0) {
    ballElement.style.top = "50%";
    ballElement.style.left = "50%";
  } else {
    do {
      ballX = Math.random() * (containerWidth - 54) + 27;
      ballY = Math.random() * (containerHeight - 54) + 27;
    } while (ballX === holeX && ballY === holeY);

    ballElement.style.left = `${ballX}px`;
    ballElement.style.top = `${ballY}px`;
  }
}

function isBallInHole() {
  return Math.abs(ballX - holeX) < 13 && Math.abs(ballY - holeY) < 13;
}

function updateTimer() {
  const currentTime = new Date() - startTime;
  const minutes = Math.floor(currentTime / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  timerElement.innerText = `${formattedMinutes}:${formattedSeconds}`;
}

function startTimer() {
  setInterval(updateTimer, 1000);
}
