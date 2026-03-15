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

//Animation
imgBG   = loadImage('imgs/background.jpg');
groundImage = loadAnimation('imgs/ground2.png');
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
astronout.addAnimation("start position", astronout_start );
astronout.scale = 0.2;

//ground
ground = createSprite(width/2, height-20, width*2, 40);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -(6 + 3*score/100);

//invisable ground 
invisibleGround = createSprite(width/2, height-20, width*2, 40);
invisibleGround.visible = false;

obstaclesGroup = new Group();
obstacle.scale = 0.2
}


function draw(){ 
    background(imgBG);
}
