let startTime;
let endTime;
let gameTime;
let points;
const holesNumber = 5;

const startModal = document.getElementById("startModal");
const startButton = document.getElementById("startButton");
const summaryModal = document.getElementById("summaryModal");
const tryAgainButton = document.getElementById("tryAgainButton");
const timeElement = document.getElementById("time");
const timerElement = document.getElementById("timer");
const menuPoints = document.getElementById("menuPoints");
const summaryPoints = document.getElementById("summaryPoints");
const menu = document.getElementById("menu");
const rankingDiv = document.getElementById("ranking");

let ranking = [];
let holes = [];
let currentHoleIndex;
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

  ranking = JSON.parse(localStorage.getItem("rankingArray")) || [];
  displayRanking();
});

window.addEventListener("deviceorientation", handleOrientation);

function updateRanking(newTime) {
  localStorage.removeItem("rankingArray");
  ranking.push(newTime);

  ranking.sort((a, b) => a - b);
  localStorage.setItem("rankingArray", JSON.stringify(ranking));

  displayRanking();
}

function displayRanking() {
  rankingDiv.innerHTML = "";
  const title = document.createElement("span");
  title.innerText = "Ranking";
  rankingDiv.appendChild(title);

  const len = ranking.length;
  if (ranking.length > 10) len = 10;

  for (let i = 0; i < len; i++) {
    const minutes = Math.floor(ranking[i] / 60000);
    const seconds = Math.floor((ranking[i] % 60000) / 1000);
    const span = document.createElement("span");
    span.innerText = `${i + 1}. ${minutes} min ${seconds} sec`;
    rankingDiv.appendChild(span);
  }
}

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
  clearHoles();
  randomizePositions();
}

function clearHoles() {
  const gameContainer = document.getElementById("gameContainer");
  const holeElements = gameContainer.querySelectorAll(".hole");
  holeElements.forEach((hole) => hole.remove());
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

function randomizeHole() {
  holes = [];
  currentHoleIndex = 0;
  for (let i = 0; i < holesNumber; i++) {
    let hole;
    do {
      hole = {
        x: Math.random() * (containerWidth - 54) + 27,
        y: Math.random() * (containerHeight - 54) + 27,
      };
    } while (
      holes.some(
        (h) => Math.abs(h.x - hole.x) < 54 && Math.abs(h.y - hole.y) < 54
      )
    );
    holes.push(hole);
    createHoleElement(hole, i + 1);
  }
}

function createHoleElement(hole, number) {
  let holeElement = document.createElement("div");
  holeElement.classList.add("hole");
  holeElement.id = "hole" + number;
  holeElement.style.left = `${hole.x}px`;
  holeElement.style.top = `${hole.y}px`;
  let holeSpan = document.createElement("span");
  holeSpan.classList.add("holeSpan");
  holeSpan.innerText = number;
  document
    .getElementById("gameContainer")
    .appendChild(holeElement)
    .appendChild(holeSpan);
}

function endGame() {
  menu.classList.add("hidden");
  endTime = new Date();
  gameTime = endTime - startTime;
  summaryPoints.innerText = points;
  summaryModal.classList.add("visible");

  if (points === 5) updateRanking(gameTime);

  const minutes = Math.floor(gameTime / 60000);
  const seconds = Math.floor((gameTime % 60000) / 1000);
  timeElement.innerText = `${minutes} min ${seconds} sec`;
}

function nextRound() {
  points++;
  const holeToDelete = document.getElementById("hole" + points);
  if (holeToDelete) holeToDelete.remove();
  menuPoints.innerText = points;
  if (points >= holesNumber) endGame();
  else {
    currentHoleIndex++;
    requestAnimationFrame(update);
  }
}

function randomizeBall() {
  const ballElement = document.querySelector(".ball");
  ballX = Math.random() * (containerWidth - 54) + 27;
  ballY = Math.random() * (containerHeight - 54) + 27;
  ballElement.style.left = `${ballX}px`;
  ballElement.style.top = `${ballY}px`;
}

function isBallInHole() {
  const hole = holes[currentHoleIndex];
  return Math.abs(ballX - hole.x) < 13 && Math.abs(ballY - hole.y) < 13;
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
