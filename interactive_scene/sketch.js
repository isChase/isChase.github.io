// Interactive scene
// Chase
// 9/21/2021
//
let x = 0;
let y = 0;
let radius = 25;
let speed = 5;
let mode;
let seq = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mode = 0;
  textSize(50);
}

function draw() {
  background(220);
  if (mode === 0 ){
    text("Press Enter To Begin", 400, 400);
  }
  handleKeys();
  if (mode === 1){
    noStroke();
    rect(25, seq, 50, 50);
  }  
}

function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  seq += event.delta;
  //uncomment to block page scrolling
  //return false;
}



function handleKeys(){
  if (keyIsDown(13)){
    mode = 1;
  }
  // if (mode === 1){
  //   if (keyIsDown(38)){ // "w"
  //     y -= speed;
  //   }
  //   if (keyIsDown(40)){ // "s"
  //     y += speed;
  //   }
  //   if (keyIsDown(37)){ // "a"
  //     x -= speed;
  //   }
  //   if (keyIsDown(39)){ //"d"
  //     x += speed;
  //   }
  //   if (keyIsDown(87)){ // "up arrow"
  //     y -= speed;
  //   }
  //   if (keyIsDown(83)){ // "down arrow"
  //     y += speed;
  //   }
  //   if (keyIsDown(65)){ // "left arrow"
  //     x -= speed;
  //   }
  //   if (keyIsDown(68)){ // "right arrow"
  //     x += speed;
  //   }
  // }
}