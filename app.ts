const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

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
let gravity = 9.8;
let damping = 0.6;

canvas.addEventListener("click", (event: MouseEvent) => {
  const circle: Circle = {
    x: event.clientX,
    y: event.clientY,
    radius: 20,
    color: getRandomColor(),
    vx: 0,
    vy: 0,
  };
  circles.push(circle);
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
  context.beginPath();
  context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  context.fillStyle = circle.color;
  context.shadowColor = "rgba(0, 0, 0, 0.5)";
  context.shadowBlur = 10;
  context.fill();
  context.closePath();
}

let lastTime = 0;
let backgroundHue = 0;

function updateBackground() {
  backgroundHue = (backgroundHue + 0.05) % 360;
  document.body.style.background = `hsl(${backgroundHue}, 100%, 95%)`;
}

function gameLoop(currentTime: number) {
  const deltaTime = currentTime - lastTime;
  context.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle) => {
    updateCircle(circle, deltaTime);
    drawCircle(circle);
  });

  updateBackground();

  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function setGravity(newGravity: number) {
  gravity = newGravity;
}

function setDamping(newDamping: number) {
  damping = newDamping;
}

document
  .getElementById("earth")!
  .addEventListener("click", () => setGravity(9.8));
document
  .getElementById("moon")!
  .addEventListener("click", () => setGravity(1.62));
document
  .getElementById("mars")!
  .addEventListener("click", () => setGravity(3.71));
document
  .getElementById("sun")!
  .addEventListener("click", () => setGravity(274));

document.getElementById("clear")!.addEventListener("click", () => {
  circles.length = 0; // Clear all circles
});

document.getElementById("apply")!.addEventListener("click", () => {
  const customGravity = parseFloat(
    (document.getElementById("customGravity") as HTMLInputElement).value
  );
  const customDamping = parseFloat(
    (document.getElementById("customDamping") as HTMLInputElement).value
  );
  setGravity(customGravity);
  setDamping(customDamping);
});
