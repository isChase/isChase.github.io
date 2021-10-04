// Interactive scene (Pong)
// Chase
// 9/21/2021

// What I did to take this project "Above and beyond":
// I implemented the scroll wheel opposed to using "wasd" or the arrow keys for the paddle
// added a score count 
// able to play using different window sizes


let mode;
let seq = 25;
let dxBall = 5;
let dyBall = 5;
// let the x coordinate be a random number
let xBall = Math.floor(Math.random() * 500) + 50;
let yBall = 50;
let diameter = 50;
let score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mode = 0;
}

// create "Start" screen, create paddles & ball 
function draw() {
  background("black");
  if (mode === 0 ){
    fill("white");
    textSize(300);
    text("Pong.", 400, 400);

    fill("White");
    textSize(25);
    text("Press Enter To Begin", 600, 600);

  }

  handleKeys();
  if (mode === 1){
    noStroke();
    rect(50, seq, 20, 50);
  } 
  // to make the ball bounce off walls
  if (mode === 1){
    xBall += dxBall;
    yBall += dyBall;
    if (xBall < diameter/2 || 
      xBall > windowWidth - 0.5*diameter) {
      dxBall *= -1;
  }
    if (yBall < diameter/2 || 
      yBall > windowHeight - diameter) {
      dyBall *= -1;
  }
  // ask if ball is in contact w/ the paddle
    if ((xBall > 61 && xBall < 61 + 20) && (yBall + (diameter/2) >= seq)) {
      dxBall *= -1;
      dyBall *= -1;
      // +1 to score if in contact w/ paddle is true
      score++;
  }

    // theball
    fill("white");
    noStroke();
    ellipse(xBall, yBall, diameter, diameter); 

    //score count
    fill("white");
    textSize(24);
    text("Score: " + score, 10, 25);


    // why doesn't this line show up? \\ 
    for (let i = 0; i < windowHeight/2; i++){
      if (mode === 1);
      line(windowWidth/2, i, windowHeight/2, i+10);  
    }
  }
}



function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount ( https://p5js.org/reference/#/p5/mouseWheel )
  seq += event.delta;
  
}


function handleKeys(){
  if (keyIsDown(13)){ // "enter"
    mode = 1;
  }

// gives ability to swap from title screen and play screen

  if (keyIsDown(82)){ // "r"
    mode = 0;
  }
}
