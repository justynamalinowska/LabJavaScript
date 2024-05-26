document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");
  const ballCountInput = document.getElementById("ballCount");
  const distanceInput = document.getElementById("distance");
  const forceInput = document.getElementById("force");
  const distanceValue = document.getElementById("distanceValue");
  const forceValue = document.getElementById("forceValue");
  const controls = document.getElementById("controls");

  let balls = [];
  let animationFrameId;

  canvas.width = 800;
  canvas.height = 700;

  class Ball {
    constructor(x, y, vx, vy, radius = 5) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.radius = radius;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#212121";
      ctx.fill();
      ctx.closePath();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
        this.vx = -this.vx;
      }

      if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
        this.vy = -this.vy;
      }
    }
  }

  function distanceBetween(ball1, ball2) {
    const dx = ball2.x - ball1.x;
    const dy = ball2.y - ball1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function drawLine(ball1, ball2) {
    ctx.beginPath();
    ctx.moveTo(ball1.x, ball1.y);
    ctx.lineTo(ball2.x, ball2.y);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.stroke();
    ctx.closePath();
  }

  function init() {
    balls = [];
    const ballCount = parseInt(ballCountInput.value);
    for (let i = 0; i < ballCount; i++) {
      const radius = 5;
      const x = Math.random() * (canvas.width - 2 * radius) + radius;
      const y = Math.random() * (canvas.height - 2 * radius) + radius;
      const vx = (Math.random() - 0.5) * 4;
      const vy = (Math.random() - 0.5) * 4;
      balls.push(new Ball(x, y, vx, vy, radius));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
      balls[i].update();
      balls[i].draw();
    }

    const maxDistance = parseInt(distanceInput.value);
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        if (distanceBetween(balls[i], balls[j]) < maxDistance) {
          drawLine(balls[i], balls[j]);
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  function reset() {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
  }

  startButton.addEventListener("click", () => {
    reset();
    init();
    animate();
  });

  resetButton.addEventListener("click", reset);

  distanceInput.addEventListener("input", () => {
    distanceValue.textContent = distanceInput.value;
  });

  forceInput.addEventListener("input", () => {
    forceValue.textContent = forceInput.value;
  });

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const newBalls = [];
    balls.forEach((ball) => {
      const dist = distanceBetween(ball, { x: mouseX, y: mouseY });
      if (dist < ball.radius) {
        newBalls.push(
          new Ball(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
          ),
          new Ball(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
          )
        );
      } else {
        newBalls.push(ball);
      }
    });
    balls = newBalls;
  });

  let mouseX,
    mouseY,
    isMouseMoving = false;
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    isMouseMoving = true;
  });

  canvas.addEventListener("mouseout", () => {
    isMouseMoving = false;
  });

  function applyForce() {
    const force = parseFloat(forceInput.value);
    if (isMouseMoving && force !== 0) {
      balls.forEach((ball) => {
        const dx = ball.x - mouseX;
        const dy = ball.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const angle = Math.atan2(dy, dx);
          ball.vx += (Math.cos(angle) * force) / dist;
          ball.vy += (Math.sin(angle) * force) / dist;
        }
      });
    }
  }

  function run() {
    applyForce();
    animate();
  }

  requestAnimationFrame(run);
});
