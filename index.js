const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = 'teal';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

const trueDraw = () => (isDrawing = true);
const falseDraw = () => (isDrawing = false);

const handleDraw = (e) => {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue >= 360) {
    return (hue = 0);
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
};

const handleMouseDown = (e) => {
  trueDraw();
  [lastX, lastY] = [e.offsetX, e.offsetY];
};

canvas.addEventListener('mousemove', handleDraw);
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', falseDraw);
canvas.addEventListener('mousemout', falseDraw);
