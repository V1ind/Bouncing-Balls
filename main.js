"use strict";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
var circles = [];
var gravity = 9.8;
var damping = 0.6;
var maxCircles = Infinity;
canvas.addEventListener("click", function (event) {
  if (circles.length < maxCircles) {
    var circle = {
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
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function updateCircle(circle, deltaTime) {
  circle.vy += gravity * (deltaTime / 1000);
  circle.y += circle.vy;
  if (circle.y + circle.radius > canvas.height) {
    circle.y = canvas.height - circle.radius;
    circle.vy *= -damping;
  }
}
function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.closePath();
}
var lastTime = 0;
var backgroundHue = 0;
function updateBackground() {
  backgroundHue = (backgroundHue + 0.1) % 360;
  document.body.style.background = "hsl(".concat(backgroundHue, ", 100%, 95%)");
}
// function removeStoppedCircles() {
//   for (let i = circles.length - 1; i >= 0; i--) {
//     if (Math.abs(circles[i].vy) < 0.1) {
//       circles.splice(i, 1);
//     }
//   }
// }

function gameLoop(currentTime) {
  var deltaTime = currentTime - lastTime;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(function (circle) {
    updateCircle(circle, deltaTime);
    drawCircle(circle);
  });
  updateBackground();
  // removeStoppedCircles();
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
//# sourceMappingURL=main.js.map
