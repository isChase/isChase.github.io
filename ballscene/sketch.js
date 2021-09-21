// Ball scene
// 9/20/2021
let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let index = 0; index < 30; index++) {
    spawnBall();

  }
  //spawn ball every 1/2 second
  window.setInterval(spawnBall, 500);

}

function draw() {
  background(220);

  moveBall();
  displayBall();
}
function mousePressed(){
  spawnBall();
  ballArray[ballArray.length-1].x = mouseX;
  ballArray[ballArray.length-1].y = mouseY;
}

function spawnBall(){
  let newBall = {
    x: random(width),
    y: random(height),
    radius: random(10, 30),
    ballColor: color(random(255), random(255), random(255), random(255)),
    dx: random(5, 10),
    dy: random(5, 10),
    xTime: 0,
    yTime: 100,
    timeChange: random(0.001, 0.1),
  };
  ballArray.push(newBall);
}

function moveBall() {
  for (let theBall of ballArray) {
    theBall.x = noise(theBall.xTime) * width;
    theBall.y = noise(theBall.yTime) * height;
    
    theBall.xTime += 0.01;
    theBall.yTime += 0.01;
  }
}

function displayBall(){
  for(let ball of ballArray){
    noStroke();
    fill(ball.ballColor);
    circle(ball.x, ball.y, ball.radius*2);
  }

}