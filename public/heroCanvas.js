const canvas = document.querySelector(".connecting-dots");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let points = [];
let mouse = { x: null, y: null, radius: 150, hovering: false };

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  mouse.hovering = true;
});

canvas.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
  mouse.hovering = false;
});

function initDots(count = 400) {
  points = [];
  for (let i = 0; i < count; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      radius: 2
    });
  }
}

function drawDots() {
  ctx.clearRect(0, 0, width, height);

  for (let point of points) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(162, 58, 253, 0.41)";
    ctx.fill();
  }

  if (mouse.hovering) {
    // Draw lines between the mouse and nearby points
    for (let i = 0; i < points.length; i++) {
      const dx = points[i].x - mouse.x;
      const dy = points[i].y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius) {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(points[i].x, points[i].y);
        ctx.strokeStyle = "rgba(0, 115, 255, .41)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  updateDots();
  requestAnimationFrame(drawDots);
}

function updateDots() {
  for (let point of points) {
    point.x += point.dx;
    point.y += point.dy;

    if (point.x <= 0 || point.x >= width) point.dx *= -1;
    if (point.y <= 0 || point.y >= height) point.dy *= -1;
  }
}

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initDots();
});

initDots();
drawDots();
