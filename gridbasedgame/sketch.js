// Painter Game
// Chase
// 10/08/2021

let timer = 30;
let grid;
let gridDimentions = 30;
let cellSize;
let level1;
let playerX = 0;
let playerY = 0;
let state = "rest";
let mode = 4;
let countDown;
// let paintNoise;


function preload(){
  level1 = loadJSON("assets/levelforgridgame.json"); //level 1

  // paintNoise = loadSound("assets/Pong_sfx.zip");

  soundFormats('mp3', 'ogg');

  countDown = loadSound("assets/Menu Choice.mp3");
}

function setup() {
  if (windowHeight < windowWidth){
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  grid = level1;
  cellSize = width / gridDimentions;

  //place player
  grid[playerY][playerX] = 9;
}

function draw(){
  if (mode === 0) {
    background(220);
    moveUntilCannot();
    noStroke();
    displayGrid();
    setScreens();
  }

  else if (mode === 1){
    displayScreen();
  }
  else if (mode === 4){
    startScreen();
  }

  if (mode === 0) {
    textAlign(CENTER, CENTER);
    textSize(20);
    fill("white");
    text(timer, 450, 450);
  
    if (frameCount % 60 === 0 && timer > 0) {
      timer--;
    }
    if (timer === 0) {
      mode = 3;
      text("GAME OVER", width/2, height*0.6);
    }
  }
}

// move character using WASD
function keyPressed(){
  if (state === "rest"){
    if (key === "s"){ //down
      state = "down";
      // paintNoise.play();
    }
    else if (key === "w"){ //up
      state = "up";
      // paintNoise.play();
    }
    else if (key === "d"){ //right
      state = "right";
      // paintNoise.play();
    }
    else if (key === "a"){ //left
      state = "left";
      // paintNoise.play();
    }
  }
  if (key === " ") {
    mode = 0;
  }
}


function moveUntilCannot() {
  //set frame count to 2 seconds
  if (frameCount % 2 === 0) {
    let didMove;
    if (state === "down") {
      didMove = tryMoving(playerX, playerY+1);
      //if there's a change in state, move the player until you are no longer able to
    }
    else if (state === "up") {
      didMove = tryMoving(playerX, playerY-1);
    }
    else if (state === "right") {
      didMove = tryMoving(playerX+1, playerY);
    }
    else if (state === "left") {
      didMove = tryMoving(playerX-1, playerY);
    }
    if (!didMove) {
      state = "rest";
    }
  }
}

function tryMoving(dX, dY){
  if (dX >= 0 && dY >= 0 && dX < gridDimentions && dY < gridDimentions){
    //check if new spot is empty or has already been painted
    if (grid[dY][dX] === 0 || grid[dY][dX] === 9 || grid[dY][dX] === 2){
      grid[playerY][playerX] = 2;
      // reset current spot to be painted

      //move player
      playerX = dX;
      playerY = dY;

      //put player back in grid
      grid[dY][dX] = 9;

      //return true if character moved
      return true;
    }
  }
  return false;
}

function swap(x,y){
  if (x >= 0 && x < gridDimentions && y >= 0 && y < gridDimentions){
    if (grid[y][x] === 0){
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1){
      grid[y][x] = 0;
    }
  }
}

//setup the grid
function displayGrid(){
  if (mode === 0) {
    for (let y = 0; y < gridDimentions; y++){
      for (let x = 0; x < gridDimentions; x++){
        if (grid[y][x] === 0){
          fill("white");
        }
        else if (grid[y][x] === 1){
          noStroke();
          fill("black");
        }
        else if (grid[y][x] === 9  ){
          noStroke();
          fill("#D36060");
        }
        else if(grid[y][x] === 2){
          noStroke();
          fill("#E0607E");
        }
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
      }
    }
  }
}

function createRandomArray(howLarge){
  if (mode === 0) {
    let newArray = [];
    for (let y = 0; y < howLarge; y++){
      newArray.push([]);
      for (let x = 0; x < howLarge; x++){
        if (random(0, 100) > 50){
          newArray[y].push(0);
  
        }
        else {
          newArray[y].push(1);
        }
      }
    }
    return newArray;
  }
}

//check if the entire grid has been covered -- if true, display win screen (see line 213)
function checkIfGameWon() {
  for (let y = 0; y < gridDimentions; y++){
    for (let x = 0; x < gridDimentions; x++){
      if (grid[y][x] === 0) {
        return false;
      }
    }
  }
  return true;
}


function setScreens(){
  if (checkIfGameWon() === true) {
    mode = 1;
  }
}


function displayScreen(){
  background("white");
  textSize(100);
  fill("black");
  text("YOU WON", 400, 400);
}

function startScreen(){ //display a start screen
  if (mode === 4) {
    background("#E0607E");
    textAlign(CENTER, CENTER);
    textSize(50);
    fill("black");
    text("PRESS SPACE TO BEGIN", 360, 300);
  }
}

function timerEnds(){
  if (timer < 4) {
    countDown.play();
  }
}