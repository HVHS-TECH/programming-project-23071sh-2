/*******************************************************/
// P5.play: Space runner game 
// PLay screen 
/// Written by Sonia Hassan
/*******************************************************/
// GAME STATES
let MENU = "menu";
let INSTRUCTIONS = "instructions";
let PLAY = "play";
let END = "end";
let gameState = MENU;
let ground, groundImage;
let astronaut, astronaut_start;
let obstacle1, obstacle2, obstacle3;

function preload() {
    imgBG = loadImage('imgs/sky.jpeg');
    groundImage = loadAnimation('imgs/ground.png');
    astronaut_start = loadAnimation('imgs/startposition.png');
    obstacle1 = loadAnimation('imgs/neptune.png');
    obstacle2 = loadAnimation('imgs/earth.png');
    obstacle3 = loadAnimation('imgs/planet.png');
}

function setup() {
    console.log("setup:");

    createCanvas(windowWidth, windowHeight);

    // Astronaut 
    astronaut = new Sprite(100, height - 80, 50, 50);
    astronaut.addAnimation("start", astronaut_start);
    astronaut.scale = 0.3;


    ground = new Sprite(width / 2, height - 20);
    ground.addAnimation(groundImage);
    ground.scale = 2;
    ground.velocity.x = -6;

    // Invisible ground (so astronaut doesn't fall)
    invisibleGround = new Sprite(width / 2, height - 20, width * 2, 40);
    invisibleGround.visible = false;

    // Obstacles
    obstacle1Sprite = new Sprite(width + 100, height - 80, 50, 50, 'k');
    obstacle1Sprite.addAnimation("neptune", obstacle1);
    obstacle1Sprite.scale = 0.2
    obstacle1Sprite.velocity.x = -6;

    obstacle2Sprite = new Sprite(width + 400, height - 80, 50, 50);
    obstacle2Sprite.addAnimation("earth", obstacle2);
    obstacle2Sprite.scale = 0.2;
    obstacle2Sprite.velocity.x = -6;

    obstacle3Sprite = new Sprite(width + 700, height - 80, 50, 50);
    obstacle3Sprite.addAnimation("planet", obstacle3);
    obstacle3Sprite.scale = 0.22;
    obstacle3Sprite.velocity.x = -6;
}

function draw() {
    background(imgBG);

    if (gameState === MENU) {
        drawMenu();
    }
    else if (gameState === INSTRUCTIONS) {
        drawInstructions();
    }

    if (gameState === PLAY) {
        drawGame();
    }
    else if (gameState === END) {
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

    // Ground scrolling
    if (ground.position.x < width / 6 - ground.width / 6) {
        ground.position.x = width / 3;
    }
    // Collision with ground
    astronaut.collide(invisibleGround);
    // Jump
    if (keyWentDown("space")) {
        astronaut.velocity.y = -12;
    }
    // Gravity
    astronaut.velocity.y += 0.6;
    // Collision with planets
    if (
        astronaut.collides(obstacle1Sprite) ||
        astronaut.collides(obstacle2Sprite) ||
        astronaut.collides(obstacle3Sprite)
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
        gameState = MENU;
    }
}





