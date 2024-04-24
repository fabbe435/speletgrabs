const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
let playerX = 200;
let playerY = 380;
let obstacleX = 0;
let obstacleY = 200;
let obstacleWidth = 150;
let obstacleHeight = 50;
let level = 1;

// Initialize level display
document.getElementById("levelDisplay").innerText = "Level " + level;

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = "blue";
  ctx.fillRect(playerX, playerY, 25, 20);

  // Draw obstacle
  ctx.fillStyle = "red";
  ctx.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);

  // Move obstacle
  obstacleX += 2;
  if (obstacleX > canvas.width) {
    obstacleX = -obstacleWidth;
  }

  // Check for collision
  if (
    isColliding(
      playerX,
      playerY,
      20,
      20,
      obstacleX,
      obstacleY,
      obstacleWidth,
      obstacleHeight
    )
  ) {
    alert("Game over!");
    resetGame();
  }

  // Check if player reached the top
  if (playerY <= 0) {
    level++;
    document.getElementById("levelDisplay").innerText = "Level " + level;
    resetGame();
  }

  requestAnimationFrame(gameLoop);
}

// Check collision between two rectangles
function isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

// Handle keyboard input
document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (key === "ArrowLeft") {
    playerX -= 10;
  } else if (key === "ArrowRight") {
    playerX += 10;
  } else if (key === "ArrowUp") {
    playerY -= 10;
  } else if (key === "ArrowDown") {
    playerY += 10;
  }
});

// Reset game
function resetGame() {
  playerX = 200;
  playerY = 380;
  obstacleX = 0;
  obstacleY = 200;
}

// Start the game loop
gameLoop();
      