let startTime;
let endTime;
let gameTime;
let points;

const startModal = document.getElementById("startModal");
const startButton = document.getElementById("startButton");
const summaryModal = document.getElementById("summaryModal");
const tryAgainButton = document.getElementById("tryAgainButton");

let holeX;
let holeY;
let ballX;
let ballY;

window.addEventListener("DOMContentLoaded", function () {
  startModal.classList.add("visible");

  startButton.addEventListener("click", function () {
    startModal.classList.remove("visible");
    startGame();
  });

  tryAgainButton.addEventListener("click", function () {
    summaryModal.classList.remove("visible");
    startGame();
  });
});

window.addEventListener("deviceorientation", handleOrientation);

function handleOrientation(event) {
  const alpha = event.alpha; // Kąt w stopniach, obrót wokół osi Z od 0 do 360 stopni
  const beta = event.beta; // Kąt w stopniach, obrót wokół osi X od -180 do 180 stopni
  const gamma = event.gamma; // Kąt w stopniach, obrót wokół osi Y od -90 do 90 stopni
}

function startGame() {
  points = 0;
  const gameContainer = document.getElementById("gameContainer");
  const containerRect = gameContainer.getBoundingClientRect();
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;
  startTime = new Date();

  randomizePositions(containerWidth, containerHeight);
  if (holeX == ballX && holeY == ballY) {
    nextRound();
  }
}

function randomizePositions(containerWidth, containerHeight) {
  randomizeHole(containerWidth, containerHeight);
  randomizeBall(containerWidth, containerHeight);
}

function endGame() {
  endTime = new Date();
  gameTime = endTime - startTime;
  summaryModal.classList.add("visible");
}

function nextRound(containerWidth, containerHeight) {
  points++;
  if (points >= 5) endGame();
  else randomizePositions(containerWidth, containerHeight);
}

function randomizeHole(containerWidth, containerHeight) {
  do {
    holeX = Math.random() * (containerWidth - 54) + 27; // 27px odstępu z obu stron
    holeY = Math.random() * (containerHeight - 54) + 27; // 27px odstępu z obu stron
  } while (
    holeX === ballX &&
    holeY === ballY // Sprawdź, czy hole nie jest na tym samym miejscu co ball
  );

  const holeElement = document.querySelector(".hole");
  holeElement.style.left = `${holeX}px`;
  holeElement.style.top = `${holeY}px`;
}

function randomizeBall(containerWidth, containerHeight) {
  const ballElement = document.querySelector(".ball");
  if (points === 0) {
    ballElement.style.top = "50%";
    ballElement.style.left = "50%";
  } else {
    do {
      ballX = Math.random() * (containerWidth - 54) + 27; // 27px odstępu z obu stron
      ballY = Math.random() * (containerHeight - 54) + 27; // 27px odstępu z obu stron
    } while (
      ballX === holeX &&
      ballY === holeY // Sprawdź, czy ball nie jest na tym samym miejscu co hole
    );

    ballElement.style.left = `${ballX}px`;
    ballElement.style.top = `${ballY}px`;
  }
}
