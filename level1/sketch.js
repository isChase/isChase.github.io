// character + grid

let grid;
let gridDimentions = 30;
let cellSize;
let level1;
let playerX = 0;
let playerY = 0;


function setup() {
  if (windowHeight < windowWidth){
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }

  grid = createEmptyArray(gridDimentions);

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
    //check if new spot is empty
    if (grid[newY][newX] === 0){
      // reset current spot to be empty
      grid[playerY][playerX] = 0;

      //move player
      playerX = newX;
      playerY = newY;

      //put player back in grid
      grid[newY][newX] = 9;
    }
  }
}


function mousePressed(){
  if (mouseX <= width && mouseY <= height){
    let cellX = Math.floor(mouseX/cellSize);
    let cellY = Math.floor(mouseY/cellSize);
    
    swap(cellX, cellY);
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
      else if (grid[y][x] === 9  ){
        fill("red");
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
function createEmptyArray(howLarge) {
  let newArray = [];
  for (let y=0; y<howLarge; y++) {
    newArray.push([]);
    for (let x=0; x<howLarge; x++) {
      newArray[y].push(0);
    }
  }
  return newArray;
}