/*******************************************************/
// P5.play: Space runner game 
// PLay screen 
/// Written by Sonia Hassan
/*******************************************************/
let MENU = "menu";
let INSTRUCTIONS = "instructions";
let PLAY = "play";
let END = "end";
let gameState = MENU;

let ground, groundImage;
let invisibleGround;
let astronaut, astronaut_start;
let obstacle1Sprite, obstacle2Sprite, obstacle3Sprite;
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
    astronaut = new Sprite(100, height - 60, 50, 50);
    astronaut.addAnimation("start", astronaut_start);
    astronaut.scale = 0.3;

    // Create two ground sprites for looping
    ground1 = new Sprite(width / 2, height - 20, 0, 0);
    ground1.addAnimation("ground", groundImage);
    ground1.scale = 1;

    ground2 = new Sprite(width / 2 + groundImage.width, height - 20, 0, 0);
    ground2.addAnimation("ground", groundImage);
    ground2.scale = 1;
    // Invisible ground for collision
    invisibleGround = new Sprite(width / 2, height - 20, width * 2, 20);
    invisibleGround.visible = false;

    // Obstacles
    obstacle1Sprite = new Sprite(width + 50, height - 60, 50, 50);
    obstacle1Sprite.addAnimation("neptune", obstacle1);
    obstacle1Sprite.scale = 0.2;

    obstacle2Sprite = new Sprite(width + 200, height - 60, 50, 50);
    obstacle2Sprite.addAnimation("earth", obstacle2);
    obstacle2Sprite.scale = 0.2;

    obstacle3Sprite = new Sprite(width + 350, height - 60, 50, 50);
    obstacle3Sprite.addAnimation("planet", obstacle3);
    obstacle3Sprite.scale = 0.22;
}

function draw() {
    background(imgBG);

    if (gameState === MENU) {
        hideSprites();
        drawMenu();
    }
    else if (gameState === INSTRUCTIONS) {
        hideSprites();
        drawInstructions();
    }
    else if (gameState === PLAY) {
        showSprites();
        drawGame();
    }
    else if (gameState === END) {
        showSprites();
        drawGameOver();
    }
}

function drawMenu() {
    textAlign(CENTER);
    fill("white");
    textSize(60);
    text("SPACE RUNNER", width / 2, height / 2 - 100);
    textSize(25);
    text("Press ENTER to Start", width / 2, height / 2);
    text("Press I for Instructions", width / 2, height / 2 + 40);
}

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

function drawGame() {
    // Gravity
    astronaut.velocity.y += 0.8;

    // Makes astronaut stand on invisible ground
    astronaut.collide(invisibleGround);

    // Loop obstacles
    loopObstacles();

    // Scroll ground
    let groundSpeed = -6;
    ground1.position.x += groundSpeed;
    ground2.position.x += groundSpeed;

    // Reset ground when off-screen
    if (ground1.position.x < -width / 2) {
        ground1.position.x = ground2.position.x + width;
    }
    if (ground2.position.x < -width / 2) {
        ground2.position.x = ground1.position.x + width;
    }

    // Collision check with obstacles
    if (
        astronaut.overlap(obstacle1Sprite) ||
        astronaut.overlap(obstacle2Sprite) ||
        astronaut.overlap(obstacle3Sprite)
    ) {
        gameState = END;
    }


    drawSprites();
}


    function drawGameOver() {
        textAlign(CENTER);
        fill("white");
        textSize(60);
        text("GAME OVER", width / 2, height / 2 - 40);
        textSize(25);
        text("Press R to Restart", width / 2, height / 2 + 40);
        drawSprites();
        
    }

   
function startGame() {
    // Obstacles move left
    obstacle1Sprite.velocity.x = -6;
    obstacle2Sprite.velocity.x = -6;
    obstacle3Sprite.velocity.x = -6;
}

function resetGame() {
    astronaut.position.x = 100;
    astronaut.position.y = height - 100;
    astronaut.velocity.y = 0;

    obstacle1Sprite.position.x = width + 50;
    obstacle2Sprite.position.x = width + 200;
    obstacle3Sprite.position.x = width + 350;
}

// Show/hide sprites
function hideSprites() {
    astronaut.visible = false;
    ground1.visible = false;
    ground2.visible = false;
    obstacle1Sprite.visible = false;
    obstacle2Sprite.visible = false;
    obstacle3Sprite.visible = false;
}

function showSprites() {
    astronaut.visible = true;
    ground1.visible = true;
    ground2.visible = true;
    obstacle1Sprite.visible = true;
    obstacle2Sprite.visible = true;
    obstacle3Sprite.visible = true;
}

// Loop obstacles quickly
function loopObstacles() {
    let obstacleSpeed = -6;

    if (obstacle1Sprite.position.x < -50) {
        obstacle1Sprite.position.x = width + 50;
    }
    if (obstacle2Sprite.position.x < -50) {
        obstacle2Sprite.position.x = obstacle1Sprite.position.x + 150;
    }
    if (obstacle3Sprite.position.x < -50) {
        obstacle3Sprite.position.x = obstacle2Sprite.position.x + 150;
    }

    obstacle1Sprite.velocity.x = obstacleSpeed;
    obstacle2Sprite.velocity.x = obstacleSpeed;
    obstacle3Sprite.velocity.x = obstacleSpeed;
}