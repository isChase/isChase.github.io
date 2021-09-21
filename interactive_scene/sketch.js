// Interactive scene
// Chase
// 9/21/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let x = 0;
let y = 0;
let radius = 25;
let speed = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
}



function draw() {
  background(220);
  handleKeys();
  noStroke();
  rect(x, y, radius * 2);
}
function handleKeys(){
  if (keyIsDown(38)){ // "w"
    y -= speed;
  }
  if (keyIsDown(40)){ // "s"
    y += speed;
  }
  if (keyIsDown(37)){ // "a"
    x -= speed;
  }
  if (keyIsDown(39)){ //"d"
    x += speed;
  }
  if (keyIsDown(87)){ // "up arrow"
    y -= speed;
  }
  if (keyIsDown(83)){ // "down arrow"
    y += speed;
  }
  if (keyIsDown(65)){ // "left arrow"
    x -= speed;
  }
  if (keyIsDown(68)){ // "right arrow"
    x += speed;
  }
}