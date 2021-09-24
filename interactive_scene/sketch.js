// Interactive scene (Pong)
// Chase
// 9/21/2021

let mode;
let seq = 25;
let xBall = random(50, 350);
let yBall = 50;
let diameter = 50;
let dxBall = 5;
let dyBall = 5;


function setup() {
  createCanvas(windowWidth, windowHeight);
  mode = 0;
  textSize(50);
}

// create "Start" screen, create paddles & ball 
function draw() {
  background("black");
  if (mode === 0 ){
    fill("White");
    text("Press Enter To Begin", 550, 300);
  }

  handleKeys();
  if (mode === 1){
    noStroke();
    rect(50, seq, 20, 250);
  } 
  fill("white");
  noStroke();
  ellipse(100, 100, 25, 25); 
    
}

function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount ( https://p5js.org/reference/#/p5/mouseWheel )
  seq += event.delta;
  
}

function handleKeys(){
  if (keyIsDown(13)){
    mode = 1;
  }
}
