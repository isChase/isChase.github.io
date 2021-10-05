// character + grid

let grid;
let gridDimentions = 15;
let cellSize;
let level1;
let playerX = 0;
let playerY = 0;


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
  displayGrid();
}

function keyPressed(){
  if (key === "s"){
    tryMovingTo(playerX, playerY+1);
  }
  else if (key === "w"){
    tryMovingTo(playerX, playerY-1);
  }
  else if (key === "d"){
    tryMovingTo(playerX+1, playerY);
  }
  else if (key === "a"){
    tryMovingTo(playerX-1, playerY);
  }
}

function tryMovingTo(newX, newY){
  if (newX >= 0 && newY >= 0 && newX < gridDimentions && newY < gridDimentions){
    //check if new spot is empty or has been painted already
    if (grid[newY][newX] === 0 || grid[newY][newX] === 9 || grid[newY][newX] === 2){
      // reset current spot to be painted
      grid[playerY][playerX] = 2;

      //move player
      playerX = newX;
      playerY = newY;

      //put player back in grid
      grid[newY][newX] = 9;
    }
  }
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
        fill("black");
      }
      // *remember to grab image for sprite here
      else if (grid[y][x] === 9  ){
        fill("blue");
      }
      else if(grid[y][x] === 2){
        fill("green");
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