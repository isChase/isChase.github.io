// gird neighbours

let grid;
let gridDimentions = 40;
let cellSize;

function setup() {
  if (windowHeight < windowWidth){
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }

  grid = createRandomArray(gridDimentions);
  cellSize = width / gridDimentions;
}

function draw() {
  background(220);
  displayGrid();
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