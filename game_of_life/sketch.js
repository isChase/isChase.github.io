// grid neighbours

let grid;
let gridDimensions = 40;
let cellSize;
let autoPlay = false;
let gun;

function preload(){
  gun = loadJSON("assets/gosper-gun.json");
}


function setup() {
  if (windowHeight < windowWidth){
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }

  grid = createRandomArray(gridDimensions);
  cellSize = width / gridDimensions;
}

function draw() {
  background(220);
  displayGrid();
  if (autoPlay && frameCount % 10 === 0) {
    update();
  }
}

function keyPressed(){
  if (key === "e"){
    grid = createEmptyArray(gridDimensions);
  }
  if (key === "r"){
    grid = createRandomArray(gridDimensions);
  }
  if (key === " ") {
    update();
  }
  if (key === "p"){
    autoPlay = !autoPlay;
  }
  if (key === "g"){
    grid = gun;
  }
}

function update(){
  //need another array so you don't mess up decisions being made
  let nextTurn = createEmptyArray(gridDimensions);
  
  for (let y = 0; y < gridDimensions; y++){
    for (let x = 0; x < gridDimensions; x++) {
      let neighbours = 0;

      for (let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
          if (y + i >= 0 && x + j >= 0 && y + i < gridDimensions && x + j < gridDimensions){
            neighbours += grid[y+i][x+j];

          }
        }
      }

      //fix adding self
      neighbours -= grid[y][x];

      //applying rules
      if (grid[y][x] === 0){
        if (neighbours === 3){
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
      if (grid[y][x] === 1){
        if (neighbours === 2 || neighbours === 3){
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  grid = nextTurn;
}

function mousePressed(){
  if (mouseX <= width && mouseY <= height){
    let cellX = Math.floor(mouseX/cellSize);
    let cellY = Math.floor(mouseY/cellSize);
    
    swap(cellX, cellY);
  }
  
}

function swap(x,y){
  if (x >= 0 && x < gridDimensions && y >= 0 && y < gridDimensions){
    if (grid[y][x] === 0){
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1){
      grid[y][x] = 0;
    }
  }
}


function displayGrid(){
  for (let y = 0; y < gridDimensions; y++){
    for (let x = 0; x < gridDimensions; x++){
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

function createEmptyArray(howLarge){
  let newArray = [];
  for (let y = 0; y < howLarge; y++){
    newArray.push([]);
    for (let x = 0; x < howLarge; x++){
      newArray[y].push(0);
    }
  }
  return newArray;
}