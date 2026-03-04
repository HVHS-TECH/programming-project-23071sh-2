/*******************************************************/
// P5.play: Space runner game 
// PLay screen 
/// Written by Sonia Hassan
/*******************************************************/
function preload() {
  imgBG   = loadImage('imgs/sky.jpeg');
}

function setup(){
console.log("setup:");
createCanvas(windowWidth, windowHeight);


//Astronout 
box = new Sprite(200, 300, 50, 100, '20');
box.color = 'white';

}


function draw(){ 
    background(imgBG);
}