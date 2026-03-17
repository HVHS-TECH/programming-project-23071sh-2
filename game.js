/*******************************************************/
// P5.play: Space runner game 
// Play screen 
// Written by Sonia Hassan
/*******************************************************/
let PLAY = 1, END = 0;
let gameState = PLAY;

let ground, groundImage;
let astronaut, astronaut_start;
let imgBG;
let obstacle1Sprite, obstacle2Sprite, obstacle3Sprite;
let obstacle1, obstacle2, obstacle3;
let score = 0;
let gravity = 1;

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
  astronaut = new Sprite(100, height - 80, 50, 50);
  astronaut.addAnimation("start", astronaut_start);
  astronaut.scale = 0.3;

  // Invisible ground
  let invisibleGround = new Sprite(width / 2, height - 20, width, 40);
  invisibleGround.visible = false;
  astronaut.collide(invisibleGround);

  // Ground: two sprites for looping
  ground = new Sprite(width / 6, height - 30);
  ground.addAnimation(groundImage);
  ground.scale = 3;
  ground.velocity.x = -8;


  // Obstacles
  obstacle1Sprite = new Sprite(width + 100, height - 80, 50, 50);
  obstacle1Sprite.addAnimation("neptune", obstacle1);
  obstacle1Sprite.scale = 0.2;
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

  if (gameState === PLAY) {
  }
}