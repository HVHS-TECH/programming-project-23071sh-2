/*******************************************************/
// P5.play: Space runner game 
// Written by Sonia Hassan
/*******************************************************/

//==================== CONSTANTS ====================//

const GAME_STATES = {
    MENU: "menu",
    INSTRUCTIONS: "instructions",
    PLAY: "play",
    END: "end"
};

const GRAVITY = 0.9;
const JUMP_FORCE = -26;
const GAME_SPEED = -6;

const ASTRONAUT_START_X = 120;
const GROUND_HEIGHT = 50;
const ASTRONAUT_GROUND_OFFSET = 120;

const OBSTACLE_GAP = 400; // distance between obstacles

//==================== VARIABLES ====================//

let gameState = GAME_STATES.MENU;

let ground1, ground2, groundImage;
let astronaut, astronaut_start;
let obstacles = [];
let obstacle1, obstacle2, obstacle3;
let imgBG;
let score = 0;

//==================== PRELOAD ====================//
// Loads all images and animations before the game starts
function preload() {
    imgBG = loadImage('imgs/sky.jpeg');
    groundImage = loadAnimation('imgs/ground.png');
    astronaut_start = loadAnimation('imgs/startposition.png');
    obstacle1 = loadAnimation('imgs/neptune.png');
    obstacle2 = loadAnimation('imgs/earth.png');
    obstacle3 = loadAnimation('imgs/planet.png');
}

//==================== SETUP ====================//
function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create astronaut sprite and set starting position
    astronaut = new Sprite(ASTRONAUT_START_X, height - 75, 50, 50);
    astronaut.addAnimation("start", astronaut_start);
    astronaut.scale = 0.35;

    // Create two ground sprites for infinite scrolling effect
    ground1 = new Sprite(width / 2, height - 50, width, 50);
    ground1.addAnimation("ground", groundImage);
    ground1.velocity.x = GAME_SPEED;
    ground1.immovable = true;

    ground2 = new Sprite(width + width / 2, height - 50, width, 50);
    ground2.addAnimation("ground", groundImage);
    ground2.velocity.x = GAME_SPEED;
    ground2.immovable = true;

    // Create obstacle sprites and store them in an array
   let obstacleImages = [obstacle1, obstacle2, obstacle3];

for (let i = 0; i < 3; i++) {
    let obs = new Sprite(width + i * OBSTACLE_GAP, height - ASTRONAUT_GROUND_OFFSET, 50, 50);
    obs.addAnimation("planet" + i, obstacleImages[i]);
    obs.scale = 0.19 + i * 0.0189;
    obs.velocity.x = GAME_SPEED; // moves left

    obs.passed = false; // for scoring
    obstacles.push(obs);
}
}

//==================== MAIN DRAW LOOP ====================//
// Controls which screen is displayed based on game state
function draw() {
    background(imgBG);

    if (gameState === GAME_STATES.MENU) {
        hideSprites();
        drawMenu();
    } else if (gameState === GAME_STATES.INSTRUCTIONS) {
        hideSprites();
        drawInstructions();
    } else if (gameState === GAME_STATES.PLAY) {
        showSprites();
        drawGame();
    } else if (gameState === GAME_STATES.END) {
        hideSprites();
        drawGameOver();
    }
}

//==================== MENU SCREEN ====================//
function drawMenu() {
    textAlign(CENTER);
    fill("white");
    textSize(60);
    text("SPACE RUNNER", width / 2, height / 2 - 100);
    textSize(25);
    text("Press ENTER to Start", width / 2, height / 2);
    text("Press I for Instructions", width / 2, height / 2 + 40);
}

//==================== Instructions ====================//
function drawInstructions() {
    textAlign(CENTER);
    fill("white");
    textSize(40);
    text("Instructions", width / 2, 150);
    textSize(20);
    text("Press SPACE to Jump", width / 2, 250);
    text("Avoid the planets!", width / 2, 280);
}

//==================== GAME ====================//
function drawGame() {
    // Apply gravity for jumping
    astronaut.velocity.y += GRAVITY;

    // Keep astronaut on the ground if falling below
    if (astronaut.position.y > height - ASTRONAUT_GROUND_OFFSET) {
        astronaut.position.y = height - ASTRONAUT_GROUND_OFFSET;
        astronaut.velocity.y = 0;
    }

    // Display score
    fill("white");
    textSize(30);
    textAlign(LEFT);
    text("Score: " + score, 20, 40);

    // Loop through obstacles
    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];

        // Reset obstacle if it goes off screen
        if (obstacle.position.x < -50) {
            // Find the rightmost obstacle
            let maxX = 0;
            for (let j = 0; j < obstacles.length; j++) {
                if (obstacles[j].position.x > maxX) {
                    maxX = obstacles[j].position.x;
                }
            }

            // Place this obstacle after the last one with equal gap
            obstacle.position.x = maxX + OBSTACLE_GAP;
            obstacle.passed = false;
        }

        // Increase score when astronaut passes obstacle
        if (!obstacle.passed && obstacle.position.x < astronaut.position.x) {
            score += 1;
            obstacle.passed = true;
        }

        // Check collision
        if (astronaut.overlap(obstacle)) {
            gameState = GAME_STATES.END;
            stopAllMovement();
        }
    }

    // Infinite scrolling ground
    if (ground1.position.x <= -width / 2) {
        ground1.position.x = ground2.position.x + width;
    }
    if (ground2.position.x <= -width / 2) {
        ground2.position.x = ground1.position.x + width;
    }
}
 
 


// KEY PRESS
function keyPressed() {

    if (gameState === GAME_STATES.MENU && keyCode === ENTER) {
        gameState = GAME_STATES.PLAY;
    }

    if (gameState === GAME_STATES.MENU && key === "i") {
        gameState = GAME_STATES.INSTRUCTIONS;
    }

    if (gameState === GAME_STATES.INSTRUCTIONS && key === "b") {
        gameState = GAME_STATES.MENU;
    }

    if (gameState === GAME_STATES.END && key === "r") {
        resetGame();
        gameState = GAME_STATES.MENU;
    }

    // Allow jump only when astronaut is near the ground
    if (gameState === GAME_STATES.PLAY && key === ' ') {
        if (astronaut.position.y >= height - ASTRONAUT_GROUND_OFFSET) {
            astronaut.velocity.y = JUMP_FORCE;
        }
    }
}

//==================== GAME OVER SCREEN ====================//
function drawGameOver() {
    textAlign(CENTER);
    fill("white");
    textSize(60);
    text("GAME OVER", width / 2, height / 2 - 40);
    textSize(25);
    text("Press R to Restart", width / 2, height / 2 + 40);
}

//==================== RESET FUNCTION ====================//
// Restores all game elements to their original state
function resetGame() {

    astronaut.position.x = ASTRONAUT_START_X;
    astronaut.position.y = height - 100;
    astronaut.velocity.y = 0;

    ground1.position.x = width / 2;
    ground1.velocity.x = GAME_SPEED;

    ground2.position.x = width + width / 2;
    ground2.velocity.x = GAME_SPEED;

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].position.x = width + OBSTACLE_SPACING[i];
        obstacles[i].position.y = height - ASTRONAUT_GROUND_OFFSET;
        obstacles[i].velocity.x = GAME_SPEED;
        obstacles[i].passed = false;
    }

    score = 0;
}

// Stops all movement when game ends
function stopAllMovement() {
    astronaut.velocity.y = 0;
    ground1.velocity.x = 0;
    ground2.velocity.x = 0;

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].velocity.x = 0;
    }
}

// Hides all sprites (used for menu screens)
function hideSprites() {
    astronaut.visible = false;
    ground1.visible = false;
    ground2.visible = false;

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].visible = false;
    }
}

// Shows all sprites (used during gameplay)
function showSprites() {
    astronaut.visible = true;
    ground1.visible = true;
    ground2.visible = true;

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].visible = true;
    }
}