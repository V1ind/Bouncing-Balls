const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

const circles: Circle[] = [];
const gravity = 9.8;
const damping = 0.6;
const maxCircles = Infinity;

canvas.addEventListener("click", (event: MouseEvent) => {
  if (circles.length < maxCircles) {
    const circle: Circle = {
      x: event.clientX,
      y: event.clientY,
      radius: 20,
      color: getRandomColor(),
      vx: 0,
      vy: 0,
    };
    circles.push(circle);
  }
});

function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateCircle(circle: Circle, deltaTime: number) {
  circle.vy += gravity * (deltaTime / 1000);
  circle.y += circle.vy;

  if (circle.y + circle.radius > canvas.height) {
    circle.y = canvas.height - circle.radius;
    circle.vy *= -damping;
  }
}

function drawCircle(circle: Circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.closePath();
}

let lastTime = 0;
let backgroundHue = 0;

function updateBackground() {
  backgroundHue = (backgroundHue + 0.1) % 360;
  document.body.style.background = `hsl(${backgroundHue}, 100%, 95%)`;
}

// function removeStoppedCircles() {
//   for (let i = circles.length - 1; i >= 0; i--) {
//     if (Math.abs(circles[i].vy) < 0.1) {
//       circles.splice(i, 1);
//     }
//   }
// }

function gameLoop(currentTime: number) {
  const deltaTime = currentTime - lastTime;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle) => {
    updateCircle(circle, deltaTime);
    drawCircle(circle);
  });

  updateBackground();
  // removeStoppedCircles();

  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
