// character + grid

let grid;
let gridDimentions = 15;
let cellSize;
let level1;
let playerX = 0;
let playerY = 0;
let state = "rest";

function preload(){
  level1 = loadJSON("assets/level0.json");
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

function draw() {
  background(220);
  moveUntilCannot();
  noStroke();
  displayGrid();
}

// move character using WASD or Arrow Keys
function keyPressed(){
  if (state === "rest"){
    if (key === "s"){ //down
      state = "down";
    }
    else if (key === "w"){ //up
      state = "up";
    }
    else if (key === "d"){ //right
      state = "right";
    }
    else if (key === "a"){ //left
      state = "left";
    }
  }
}
function moveUntilCannot() {
  if (frameCount % 3 === 0) {
    let didMove;
    if (state === "down") {
      didMove = tryMoving(playerX, playerY+1);
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

function tryMoving(newX, newY){
  if (newX >= 0 && newY >= 0 && newX < gridDimentions && newY < gridDimentions){
    //check if new spot is empty or has already been painted
    if (grid[newY][newX] === 0 || grid[newY][newX] === 9 || grid[newY][newX] === 2){
      grid[playerY][playerX] = 2;
      // reset current spot to be painted

      //move player
      playerX = newX;
      playerY = newY;

      //put player back in grid
      grid[newY][newX] = 9;

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


function displayGrid(){
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

function createRandomArray(howLarge){
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