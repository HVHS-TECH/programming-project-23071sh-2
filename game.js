/*******************************************************/
// P5.play: Space runner game 
// PLay screen 
/// Written by Sonia Hassan
/*******************************************************/
let ground, groundImage;

function preload() {

//Animation
imgBG   = loadImage('imgs/sky.jpeg');
astronout_start = loadAnimation('imgs/startposition.png');



}

function setup(){
console.log("setup:");
createCanvas(windowWidth, windowHeight);

//Astronout 
astronout = new Sprite(50, 800, 20, 50, 'k');
astronout.addAnimation("start position", astronout_start );
astronout.scale = 0.2;

//Obstacles
obstaclesGroup = new Group();
object1 = new Sprite(400, 800, 80, 90, 'k')
object2 = new Sprite(600, 800, 80, 90, 'k')
object3 = new Sprite(800, 800, 80, 90, 'k')
object4 = new Sprite(1000, 800, 80, 90, 'k')

//Ground 
ground = new Sprite(200, 810, 3440, 20,);
}




function draw(){ 
    background(imgBG);
}