// Button OOP Demo

let buttonOne, buttonTwo;
let backgroundColor = "white";

function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonOne = new Button(300, 200, 400, 100);
  buttonTwo = new Button(300, 400, 400, 100);
  buttonTwo.notHoverColor = "#3D3B30";
  buttonTwo.hoverColor = "#E7E247";
}

function draw() {
  background(backgroundColor);
  buttonOne.display();
  buttonTwo.display();
}

function mousePressed() {
  if (buttonOne.checkIfInside(mouseX, mouseY)) {
    backgroundColor = "red";
  }
  else if (buttonTwo.checkIfInside(mouseX, mouseY)) {
    backgroundColor = "black";
  }
}

class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.hoverColor = "#F7B32B";
    this.notHoverColor = "#2D1E2F";
  }

  display() {
    if (this.checkIfInside(mouseX, mouseY)) {
      fill(this.hoverColor);
    }
    else {
      fill(this.notHoverColor);
    }
    rect(this.x, this.y, this.width, this.height);
  }

  checkIfInside(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
}