const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const skinMenu = document.getElementById("skinMenu");
const playButton = document.getElementById("playButton");
const skinChangeButton = document.getElementById("skinChangeButton");
const backButton = document.getElementById("backButton");

// variables
class Player {}
let playerX = 190;
let playerY = 450;
let level = 1;

const playerImage = new Image();
playerImage.src = '/images/Crocodile-PNG-File.png';

const skins = {
    'skin1': '/images/Crocodile-PNG-File.png',
    'skin2': '/images/Chicken_cartoon_04.svg.png',
    'skin3': '/images/PERSONALalla-1jj.jpg'
    // Add more skins here
};

function randomX() {
    return Math.floor(Math.random() * (600 - 400 + 1)) + 400;
}


const obstaclesLeft = [
    [{ x: randomX(), y: 190, width: 100, height: 30 }],
    [{ x: randomX(), y: 190, width: 100, height: 30 }, { x: randomX(), y: 150, width: 100, height: 30 }],
    [{ x: randomX(), y: 190, width: 100, height: 30 }, { x: randomX(), y: 150, width: 100, height: 30 }, { x: randomX(), y: 100, width: 100, height: 30 }] // Level 3: Three obstacles
];
const obstaclesRight = [
    [{ x: randomX(), y: 280, width: 100, height: 30 }],
    [{ x: randomX(), y: 280, width: 100, height: 30 }, { x: randomX(), y: 320, width: 100, height: 30 }],
    [{ x: randomX(), y: 280, width: 100, height: 30 }, { x: randomX(), y: 320, width: 100, height: 30 }, { x: randomX(), y: 370, width: 100, height: 30 }]
];

document.getElementById("levelDisplay").innerText = "Level " + level;

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(playerImage, playerX, playerY, 100, 40);

    const currentLevel = Math.min(level, obstaclesLeft.length, obstaclesRight.length);
    obstaclesLeft[currentLevel - 1].forEach(obstacle => {
        ctx.fillStyle = "red";
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (level == 1) {
            obstacle.x += 2;
        } else {
            obstacle.x += 2 * (level / 2);
        }
        if (obstacle.x > canvas.width) {
            obstacle.x = -obstacle.width;
        }

        if (isColliding(playerX, playerY, 100, 40, obstacle.x, obstacle.y, obstacle.width, obstacle.height)) {
            alert("Game over!");
            resetGame();
        }
    });
    obstaclesRight[currentLevel - 1].forEach(obstacle => {
        ctx.fillStyle = "purple";
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (level == 1) {
            obstacle.x -= 2;
        } else {
            obstacle.x -= 2 * (level / 2);
        }
        if (obstacle.x < -100) {
            obstacle.x = canvas.width;
        }

        if (isColliding(playerX, playerY, 100, 40, obstacle.x, obstacle.y, obstacle.width, obstacle.height)) {
            alert("Game over!");
            resetGame();
        }
    });

    if (playerY <= 0) {
        level++;
        document.getElementById("levelDisplay").innerText = "Level " + level;
        resetGame();
    }

    requestAnimationFrame(gameLoop);
}

function isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

document.addEventListener("keydown", function (event) {
    const key = event.key;
    //controls
    if (key === "ArrowLeft" || key === "a") {
        playerX -= 10;
    } else if (key === "ArrowRight" || key === "d") {
        playerX += 10;
    } else if (key === "ArrowUp" || key === " ") {
        playerY -= 20;
    } else if (key === "ArrowDown" || key === "s") {
        playerY += 10;
    }
});

// Reset game
function resetGame() {
    playerX = 190;
    playerY = 450;

    const currentLevel = Math.min(level, obstaclesLeft.length, obstaclesRight.length);
    
    for (let i = 0; i < obstaclesLeft[currentLevel - 1].length; i++) {
        if (currentLevel - 1 == 0) { 
            obstaclesLeft[currentLevel - 1][i].x = -100;
        } else if (currentLevel - 1 == 1) {
            obstaclesLeft[currentLevel - 1][i].x = i == 0 ? 0 : -125;
        } else if (currentLevel - 1 == 2) {
            obstaclesLeft[currentLevel - 1][i].x = i == 0 ? 0 : i == 1 ? -125 : -250;
        }
    }

    for (let i = 0; i < obstaclesRight[currentLevel - 1].length; i++) {
        if (currentLevel - 1 < 3) {
            obstaclesRight[currentLevel - 1][i].x = randomX();
        } else {
            obstaclesRight[currentLevel - 1][i].x = 400;
        }
    }
}

playerImage.onload = function() {
    gameLoop();
};

playButton.addEventListener("click", function() {
    menu.style.display = "none";
    canvas.style.display = "block";
    document.getElementById("levelDisplay").style.display = "block";
});

skinChangeButton.addEventListener("click", function() {
    menu.style.display = "none";
    skinMenu.style.display = "flex";
});

backButton.addEventListener("click", function() {
    skinMenu.style.display = "none";
    menu.style.display = "flex";
});

document.querySelectorAll('.skin-option').forEach(function(skinOption) {
    skinOption.addEventListener('click', function() {
        const selectedSkin = skinOption.getAttribute('id');
        playerImage.src = skins[selectedSkin];
        skinMenu.style.display = "none";
        menu.style.display = "flex"; // Return to main menu after selecting skin
    });
});
