/*******************************************************/
// P5.play: Space runner game 
// PLay screen 
/// Written by Sonia Hassan
/*******************************************************/
function preload() {
imgBG   = loadImage('imgs/sky.jpeg');

astronout_start = loadAnimation('imgs/startposition.png');
}

function setup(){
console.log("setup:");
createCanvas(windowWidth, windowHeight);

//Astronout 
astronout = new Sprite(200, 300, 50, 100, '20');
astronout.addAnimation("start position", astronout_start );
astronout.scale = 0.15;

//Obstacles




}


function draw(){ 
    background(imgBG);
}