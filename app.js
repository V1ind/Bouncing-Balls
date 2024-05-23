"use strict";
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
var circles = [];
var gravity = 9.8;
var damping = 0.6;

canvas.addEventListener("click", function (event) {
  var circle = {
    x: event.clientX,
    y: event.clientY,
    radius: 20,
    color: getRandomColor(),
    vx: 0,
    vy: 0,
  };
  circles.push(circle);
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
  context.beginPath();
  context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  context.fillStyle = circle.color;
  context.shadowColor = "rgba(0, 0, 0, 0.5)";
  context.shadowBlur = 10;
  context.fill();
  context.closePath();
}
var lastTime = 0;
var backgroundHue = 0;
function updateBackground() {
  backgroundHue = (backgroundHue + 0.05) % 360;
  document.body.style.background = "hsl(".concat(backgroundHue, ", 100%, 95%)");
}
function gameLoop(currentTime) {
  var deltaTime = currentTime - lastTime;
  context.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(function (circle) {
    updateCircle(circle, deltaTime);
    drawCircle(circle);
  });
  updateBackground();
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
function setGravity(newGravity) {
  gravity = newGravity;
}
function setDamping(newDamping) {
  damping = newDamping;
}
document.getElementById("earth").addEventListener("click", function () {
  return setGravity(9.8);
});
document.getElementById("moon").addEventListener("click", function () {
  return setGravity(1.62);
});
document.getElementById("mars").addEventListener("click", function () {
  return setGravity(3.71);
});
document.getElementById("sun").addEventListener("click", function () {
  return setGravity(274);
});
document.getElementById("clear").addEventListener("click", function () {
  circles.length = 0;
});
document.getElementById("apply").addEventListener("click", function () {
  var customGravity = parseFloat(
    document.getElementById("customGravity").value
  );
  var customDamping = parseFloat(
    document.getElementById("customDamping").value
  );
  setGravity(customGravity);
  setDamping(customDamping);
});
