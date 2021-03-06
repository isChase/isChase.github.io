// Sudoku

let initialGrid = [
  [0, 2, 4, 3, 8, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 6, 0, 0, 7],
  [0, 5, 8, 0, 0, 0, 4, 0, 0],
  [4, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 7, 0, 5, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 8],
  [0, 0, 1, 0, 0, 0, 6, 7, 0],
  [3, 0, 0, 5, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 9, 2, 1, 0],
];

let gridDimensions = 9;
let cellSize;
let grid;

function setup() {
  if (windowWidth < windowHeight){
    createCanvas(windowWidth*0.8, windowWidth*0.8);
  }
  else {
    createCanvas(windowHeight*0.8, windowHeight*0.8);
  }

  grid = initialGrid;
  cellSize = width / gridDimensions;
}

function draw() {
  background(220);
  displayGrid();
}

// bad call if you're grid is gonna change
function windowResized(){
  setup();
}

function displayGrid(){
  for (let y = 0; y < gridDimensions; y++){
    for (let x = 0; x < gridDimensions; x++){
      fill("white");
      strokeWeight(1);
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
     
      if (grid[y][x] !== 0){
        fill("black");
        textSize(cellSize*0.75);
        textAlign(CENTER, CENTER);
        text(grid[y][x], x*cellSize + cellSize/2, y*cellSize + cellSize/2);
      }
    }
  }
  
  drawCageLines();
}
function drawCageLines(){
  strokeWeight(4);

  for (let location = 0; location <= 9; location += 3){
    line(0, location*cellSize, width, location*cellSize);
    line(location*cellSize, 0, location*cellSize, height);
  }
}