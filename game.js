/*******************************************************/
// P5.play: Space runner game 
// PLay screen 
/// Written by Sonia Hassan
/*******************************************************/
let PLAY = 1;
let END = 0;
let gameState = PLAY;

let ground, invisibleGround, groundImage;

function preload() {
//Imaes/animations 
imgBG = loadImage('imgs/sky.jpeg');

groundImage = loadAnimation('imgs/ground.png');

astronout_start = loadAnimation('imgs/startposition.png');

obstacle1 = loadAnimation('imgs/neptune.png');
obstacle2 = loadAnimation('imgs/earth.png');
obstacle3 = loadAnimation('imgs/planet.png'); 
}

function setup(){
console.log("setup:");
createCanvas(windowWidth, windowHeight);

//Astronout 
astronout = new Sprite(50, 850, 20, 50, 'k');
astronout.addAnimation("start position", astronout_start);
astronout.scale = 0.3;

//Ground
ground = new Sprite(width/2, height-20);
ground.addAnimation(groundImage);
ground.scale = 2;
ground.velocity.x = -6;

// Invisible ground (so astronaut doesn't fall)
invisibleGround = new Sprite(width/2, height-20, width*2, 40);
invisibleGround.visible = false;

// Obstacles
obstacle1Sprite = new Sprite(width+200, height-80, 50, 50, 'k');
obstacle1Sprite.addAnimation("neptune", obstacle1);
obstacle1Sprite.scale = 0.2
obstacle1Sprite.velocity.x = -6; // obstacle moves left

obstacle2Sprite = new Sprite(width+600, height-80, 50, 50, 'k');
obstacle2Sprite.addAnimation("earth", obstacle2);
obstacle2Sprite.scale = 0.2
obstacle2Sprite.velocity.x = -6; // obstacle moves left

obstacle3Sprite = new Sprite(width+1000, height-80, 50, 50, 'k');
obstacle3Sprite.addAnimation("planet", obstacle3);
obstacle3Sprite.scale = 0.2
obstacle3Sprite.velocity.x = -6; // obstacle moves left
}

function draw(){ 
background(imgBG);

// Move ground forever
 if(gameState === PLAY){
 // Ground movement
if (ground.position.x < width/6 - ground.width/6){
 ground.position.x = width/3;
}
 }
}