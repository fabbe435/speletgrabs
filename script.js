const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
let playerX = 190;
let playerY = 450;
let level = 1;

// Array to store obstacles for each level
const obstaclesLeft = [
    [{ x: -100, y: 190, width: 100, height: 30 }], // Level 1: One obstacle
    [{ x: 0, y: 190, width: 100, height: 30 }, { x: -125, y: 150, width: 100, height: 30 }], // Level 2: Two obstacles
    [{ x: 0, y: 190, width: 100, height: 30 }, { x: -125, y: 150, width: 100, height: 30 }, { x: -250, y: 100, width: 100, height: 30 }] // Level 3: Three obstacles
];
const obstaclesRight = [
    [{ x: 400, y: 280, width: 100, height: 30 }], // Level 4: One obstacle
    [{ x: 400, y: 280, width: 100, height: 30 }, { x: 400, y: 320, width: 100, height: 30 }], // Level 5: Two obstacles
    [{ x: 400, y: 280, width: 100, height: 30 }, { x: 400, y: 320, width: 100, height: 30 }, { x: 400, y: 370, width: 100, height: 30 }] // Level 3: Three obstacles
];

// Visar vilken nivå man är på
document.getElementById("levelDisplay").innerText = "Level " + level;

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = "palegoldenrod";
    ctx.fillRect(playerX, playerY, 20, 20);

    // Draw obstacles for the current level
    const currentLevel = Math.min(level, obstaclesLeft.length, obstaclesRight.length);
    obstaclesLeft[currentLevel - 1].forEach(obstacle => {
        ctx.fillStyle = "red";
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Move obstacle
        if (level == 1){
          obstacle.x += 2
        } else{
          obstacle.x += 2*(level/2);
        }
        if (obstacle.x > canvas.width) {
            obstacle.x = -obstacle.width;
        }

        // Check for collision
        if (isColliding(playerX, playerY, 20, 20, obstacle.x, obstacle.y, obstacle.width, obstacle.height)) {
            alert("Game over!");
            resetGame();
        }
    });
    obstaclesRight[currentLevel - 1].forEach(obstacle => {
        ctx.fillStyle = "orange";
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Move obstacle
        if (level == 4){
          obstacle.x -= 2
        } else{
          obstacle.x -= 2*(level/2);
        }
        if (obstacle.x < -100) {
            obstacle.x = +canvas.width;
        }

        // Check for collision
        if (isColliding(playerX, playerY, 20, 20, obstacle.x, obstacle.y, obstacle.width, obstacle.height)) {
            alert("Game over!");
            resetGame();
        }
    });

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
    //controls
    if (key === "ArrowLeft" || key === "a") {
        playerX -= 10;
    } else if (key === "ArrowRight" || key === "d") {
        playerX += 10;
    } else if (key === "ArrowUp" || key  === " ") {
        playerY -= 20;
    } else if (key === "ArrowDown" || key === "s") {
        playerY += 10;
    } 
});

// Reset game
function resetGame() {
    playerX = 190;
    playerY = 450;
}

// Start the game loop
gameLoop();
