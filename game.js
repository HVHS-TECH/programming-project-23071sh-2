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
astronout.addAnimation("start position", astronout_start);
astronout.scale = 0.3;

ground = new Sprite(width/2, height-20, width*2, 40);
ground.addAnimation(groundImage);
ground.scale = 3;
ground.velocity.x = -6; // ground moves left

// Invisible ground (so astronaut doesn't fall)
invisibleGround = new Sprite(width/2, height-20, width*2, 10);
invisibleGround.visible = false;;

// Obstacles

obstacle1Sprite = new Sprite(400, height-80, 50, 50, 'k');
obstacle1Sprite.addAnimation("neptune", obstacle1);
obstacle1Sprite.scale = 0.2

obstacle2Sprite = new Sprite(600, height-80, 50, 50, 'k');
obstacle2Sprite.addAnimation("earth", obstacle2);
obstacle2Sprite.scale = 0.2

obstacle3Sprite = new Sprite(800, height-80, 50, 50, 'k');
obstacle3Sprite.addAnimation("planet", obstacle3);
obstacle3Sprite.scale = 0.22


}



function draw(){ 
    background(imgBG);
}