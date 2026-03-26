/*******************************************************/
// P5.play: Space runner game 
// Play screen 
// Written by Sonia Hassan
/*******************************************************/
let MENU = "menu";
let INSTRUCTIONS = "instructions";
let PLAY = "play";
let END = "end";
let gameState = MENU;

let ground1, ground2, groundImage;
let astronaut, astronaut_start;
let obstacles = [];
let obstacle1, obstacle2, obstacle3;
let imgBG;

function preload() {
    imgBG = loadImage('imgs/sky.jpeg');
    groundImage = loadAnimation('imgs/ground.png');
    astronaut_start = loadAnimation('imgs/startposition.png');
    obstacle1 = loadAnimation('imgs/neptune.png');
    obstacle2 = loadAnimation('imgs/earth.png');
    obstacle3 = loadAnimation('imgs/planet.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Astronaut
    astronaut = new Sprite(150, height - 120, 50, 50);
    astronaut.addAnimation("start", astronaut_start);
    astronaut.scale = 0.3;

    // Ground
    ground1 = new Sprite(width / 2, height - 50, width, 50);
    ground1.addAnimation("ground", groundImage);
    ground1.velocity.x = -6;
    ground1.immovable = true;

    ground2 = new Sprite(width + width / 2, height - 50, width, 50);
    ground2.addAnimation("ground", groundImage);
    ground2.velocity.x = -6;
    ground2.immovable = true;
    // Obstacles
    let obstacleImages = [obstacle1, obstacle2, obstacle3];
    let startX = [50, 300, 600];

    for (let i = 0; i < 3; i++) {
        let obs = new Sprite(width + startX[i], height - 120, 50, 50);
        obs.addAnimation("planet" + i, obstacleImages[i]);
        obs.scale = 0.2 + i * 0.02;
        obs.velocity.x = -6;
        obstacles.push(obs);
    }
}

function draw() {
    background(imgBG);

    if (gameState === MENU) {
        hideSprites();
        drawMenu();
    } else if (gameState === INSTRUCTIONS) {
        hideSprites();
        drawInstructions();
    } else if (gameState === PLAY) {
        showSprites();
        drawGame();
    } else if (gameState === END) {
        showSprites();
        drawGameOver();
    }
}

// MENU
function drawMenu() {
    textAlign(CENTER);
    fill("white");
    textSize(60);
    text("SPACE RUNNER", width / 2, height / 2 - 100);
    textSize(25);
    text("Press ENTER to Start", width / 2, height / 2);
    text("Press I for Instructions", width / 2, height / 2 + 40);
}

// INSTRUCTIONS
function drawInstructions() {
    textAlign(CENTER);
    fill("white");
    textSize(40);
    text("Instructions", width / 2, 150);
    textSize(20);
    text("Press SPACE to Jump", width / 2, 250);
    text("Avoid the planets!", width / 2, 280);
    text("Survive as long as possible", width / 2, 310);
    text("Press B to go back", width / 2, 400);
}

// GAME
function drawGame() {
    // Gravity
    astronaut.velocity.y += 0.8;
    
    if (astronaut.position.y > height - 120) {
    astronaut.position.y = height - 120;
    astronaut.velocity.y = 0;
}
// Obstacles
    for (let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].position.x < -50) {
            obstacles[i].position.x = width + random(100, 400);
        }

        // Collision
        if (astronaut.overlap(obstacles[i])) {
            gameState = END;
        }
    }


// Perfect infinite loop
if (ground1.position.x <= -width / 2) {
    ground1.position.x = ground2.position.x + width;
}

if (ground2.position.x <= -width / 2) {
    ground2.position.x = ground1.position.x + width;
}

}

// KEY PRESS
function keyPressed() {
    if (gameState === MENU && keyCode === ENTER) {
        gameState = PLAY;
    }

    if (gameState === MENU && key === "i") {
        gameState = INSTRUCTIONS;
    }

    if (gameState === INSTRUCTIONS && key === "b") {
        gameState = MENU;
    }

    if (gameState === END && key === "r") {
        resetGame();
        gameState = MENU;
    }

    // Jump
    if (gameState === PLAY && key === ' ') {
        if (astronaut.position.y >= height - 120) {
            astronaut.velocity.y = -15;
        }
    }
}

// GAME OVER
function drawGameOver() {
    textAlign(CENTER);
    fill("white");
    textSize(60);
    text("GAME OVER", width / 2, height / 2 - 40);
    textSize(25);
    text("Press R to Restart", width / 2, height / 2 + 40);
}

// RESET GAME
function resetGame() {
    astronaut.position.x = 150;
    astronaut.position.y = height - 120;
    astronaut.velocity.y = 0;

    let startX = [50, 300, 600];
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].position.x = width + startX[i];
    }

    ground1.position.x = width / 2;
}

// SHOW / HIDE
function hideSprites() {
    astronaut.visible = false;
    ground1.visible = false;
    ground2.visible = false;
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].visible = false;
    }
}

function showSprites() {
    astronaut.visible = true;
    ground1.visible = true;
    ground2.visible = true;
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].visible = true;
    }
}