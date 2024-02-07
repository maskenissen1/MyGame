const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const box = 20;
let snake = [{x: 200, y: 200}];
let food = {x: 0, y: 0};
let direction = 'right';
let score = 0;

function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, box, box);
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);
}

function randomPosition() {
  return Math.floor(Math.random() * 20) * box;
}

function createFood() {
  food.x = randomPosition();
  food.y = randomPosition();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
  eatFood();
  displayScore();
}

function moveSnake() {
  const head = {x: snake[0].x, y: snake[0].y};
  switch (direction) {
    case 'up':
      head.y -= box;
      break;
    case 'down':
      head.y += box;
      break;
    case 'left':
      head.x -= box;
      break;
    case 'right':
      head.x += box;
      break;
  }
  snake.unshift(head);
}

function checkCollision() {
  if (snake[0].x >= canvas.width || snake[0].x < 0 || snake[0].y >= canvas.height || snake[0].y < 0) {
    gameOver();
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      gameOver();
    }
  }
}

function eatFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    createFood();
    score++;
  } else {
    snake.pop();
  }
}

function displayScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 25);
}

function gameOver() {
  clearInterval(game);
  ctx.fillStyle = 'black';
  ctx.font = '40px Arial';
  ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (event.key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  } else if (event.key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (event.key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  }
});

createFood();
let game = setInterval(draw, 100);