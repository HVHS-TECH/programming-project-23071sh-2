/*******************************************************/
// P5.play: Space runner game 
// PLay screen 
/// Written by Sonia Hassan
/*******************************************************/
<<<<<<< HEAD
=======
let ground, groundImage;

function preload() {

//Animation
imgBG   = loadImage('imgs/sky.jpeg');
astronout_start = loadAnimation('imgs/startposition.png');
obstacle1 = loadImage("imgs/earth.png");
obstacle2 = loadImage("imgs/neptune.png");
obstacle2 = loadImage("imgs/planet.png");

}
>>>>>>> 703dc0e9b7ddd4d602d780f65afede54760e96a3

function setup(){
console.log("setup:");
createCanvas(windowWidth, windowHeight);

<<<<<<< HEAD
Astronout = createSprite(50,180,20,50);
  
=======
//Astronout 
astronout = new Sprite(50, 850, 20, 50, 'k');
astronout.addAnimation("start position", astronout_start );
astronout.scale = 0.2;

//ground
ground = createSprite(width/2, height-20, width*2, 40);
ground.color = '#0d0429'
ground.vel.x = -5; // moves ground left

obstaclesGroup = new Group();

score = 0;
>>>>>>> 703dc0e9b7ddd4d602d780f65afede54760e96a3
}


function draw(){ 
<<<<<<< HEAD
    background(blue);
}
=======
background(imgBG);
text("Score: "+ score, 500,50);


// reset ground so it loops
if (ground.x < width/2){
ground.x = width/2;
}

}
>>>>>>> 703dc0e9b7ddd4d602d780f65afede54760e96a3
