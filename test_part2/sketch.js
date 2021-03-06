// Blackjack for Capstone Coding project
//
// Chase
//
// 01/11/2021
//
// everything worked fine before I brought it to school btw!

class Hand {
  constructor(x, y, d = false) {
    this.isDealer = d;
    this.cards = [];
    this.value = 0;
    this.x = x;
    this.y = y;
  }
  addCard(card) {
    this.cards.push(card);

  }
  getValue() {
    let total = 0;
    this.cards.forEach((e) => {
      if (!isNaN(e.value)) {
        total += e.value;
      }
      else if (e.value === "A") {
        total = total + 11 < 22 ? total + 11 : total + 1;
      } // set the Ace to be either 11, or 1 by asking a question of if it will bust player's hand
      else {
        total += 10;
      }
    });
    return total;
  }
  busted() {
    if (this.getValue() > 21) { //if the total of the player's hands is above 21, return true for bust.
      return true;
    } 
    else {
      return false;
    }
  }
  draw() {
    if (this.isDealer) {
      this.cards.forEach((e, i) => {
        if (inPlay){
          e.visible = i === 0 ? false : true;
        }
        else {
          e.visible = true;
          e.x = this.x + i * 28;
          e.y = this.y + i * 10;
          e.draw();
        }
      });
    }
    else {
      this.cards.forEach((e, i) => {
        e.visible = true;
        e.x = this.x + i * 28;
        e.y = this.y + i * 10;
        e.draw();
      });
    }
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.suits = ["s", "c", "d", "h"]; // declare the suits [spades, clubs, diamonds, hearts]
    this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]; // declare the values
    this.suits.forEach((s) => {
      this.values.forEach((v) => {
        this.cards.push(createCard(0, 0, s, v));
      });
    });
    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) { // we use "i--" to count down the cards that have already been shuffled
      let r = Math.floor(Math.random() * (i + 1));
      let temp = this.cards[i]; // shuffle each card using a bootleg loop
      this.cards[i] = this.cards[r];
      this.cards[r] = temp;
    }
  }

  dealCard() {
    return this.cards.pop();
  }

  draw() {
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].x = 35 + i / 6;
      this.cards[i].y = 45 - i / 11;
      this.cards[i].draw();
    }
  }
}

let deck = new Deck();

let player = new Hand(300, 200);
let dealer = new Hand(300, 100, true);

let inPlay = false;
let message = "Hit or Stand?";
let money = 500;
let bet = 0;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  inPlay = true;
  deal();
  console.log(player.getValue());
  console.log(dealer.getValue());
}

function draw() {
  background("green");
  player.draw();
  push();

  fill(0);
  textSize(22);
  text(message, 100, 200);
  pop();

  push();
  fill(0);
  textSize(22);
  text("$: " + money, 5, 30);
  text("Bet: " + bet, 5, 50);
  pop();
}

function createCard(x, y, s, v) {
  return {
    x: x,
    y: y,
    suit: s,
    value: v,
    visible: false,
    color: undefined,
    draw: function () {
      this.setColor();
      fill("white");
      rect(this.x, this.y, 50, 66);
      fill(this.color);
      text(this.value, this.x - 20, this.y - 20);
      text(this.value, this.x + 10, this.y + 30);

      if (this.suit === "d"){
        push();
        // draw the shape of a diamond using a rectangle and rotating it by ??/4
        noStroke();
        translate(this.x, this.y);
        rotate(PI / 4);
        rect(0, 0, 10, 10);
        pop();
      }

      if (this.suit === "h") {
        push();
        // draw a heart using two circles and a rect and rotate by ??/4
        noStroke();
        translate(this.x, this.y);
        rotate(PI / 4);
        rect(0, 0, 10, 10);
        ellipse(-5, 0, 10, 10);
        ellipse(0, -5, 10, 10);
        pop();
      }

      if (this.suit === "s") {
        push();
        // draw a spade using a trianlge, rectangle, and two circles and rotating by ??/4
        noStroke();
        translate(this.x, this.y);
        triangle(0, 0, 3, 13, -3, 13);
        rotate(PI / 4);
        rect(0, 0, 10, 10);
        ellipse(5, 0, 10, 10);
        ellipse(0, 5, 10, 10);
        pop();
      }

      // draw a club using a triangle and 3 circles
      if (this.suit === "c") {
        push();
        fill(0);
        translate(this.x, this.y);
        triangle(0, 0, 3, 13, -3, 13);
        ellipse(5, 5, 10, 10);
        ellipse(0, -2, 10, 10);
        ellipse(-5, 5, 10, 10);
        pop();
      }
    },
    setColor: function () {
      if (this.suit === "d" || this.suit === "h") { // set diamond & hearts to red and spades & clubs to black
        this.color = "red";
      } 
      else {
        this.color = "black";
      }
    },
  };
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode === 72) { //H key 
    if (inPlay) {
      hit();
    }
  }
  if (keyCode === 83) {//S key
    stand();
  }
  if (keyCode === 32){ // space bar
    deal();
  }  
  if (keyCode === 48){ // 0
    bet = 0;
  }
  if (keyCode === 49){ // 1
    bet += 100;
  }
  if (keyCode === 50){ // 2
    bet += 200;
  }
  if (keyCode === 51){ // 3 
    bet += 300;
  }
  if (keyCode === 52){ // 4
    bet += 400;
  }
  if (keyCode === 53){ // 5
    bet += 500;
  }

}

function deal() {
  inPlay = true;
  if (deck.cards.length < 4){
    deck = new Deck();
    player.cards = [];
    dealer.cards = [];
  }
 
  player.addCard(deck.dealCard());
  player.addCard(deck.dealCard());
  dealer.addCard(deck.dealCard());
  dealer.addCard(deck.dealCard());
  message = "Hit or Stay?";
}

function hit() {
  if (deck.cards.length < 1){
    deck = new Deck();

    player.addCard(deck.dealCard()); //add one card if player decides to hit
  }

  if (player.busted()) {
    message = "DEALER WON!";
    inPlay = false;
  }
  console.log(player.getValue());
}

function stand() {
  while (dealer.getValue() < 17){
    dealer.addCard(deck.dealCard());
    console.log(dealer.cards[0].visible);
    dealer.cards[0].visible = true;
    console.log(dealer.cards[0].visible);
    inPlay = false;
  }
  if (dealer.busted()) { // set win/lose screens based off of the dealer's value compared to the player's
    message = "DEALER BUST!";
  } 
  else if (player.getValue() > dealer.getValue()) {
    message = "YOU WIN!";
  } 
  else if (player.getValue() === dealer.getValue()) {
    message = "YOU TIED.";
  } 
  else {
    message = "YOU LOST!";
  }
}
