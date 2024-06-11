"use strict";

var stepSize = 5; // Step size for movement
var agentCount = 30; // Number of agents
var speed = 1; // Slower speed
var lineWidth = 1.5; // Line width

var agents = [];
var frameCounter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(0); // Black background

  for (let i = 0; i < agentCount; i++) {
    agents.push(new Agent());
  }

  // Hide the loading screen after 3 seconds
  setTimeout(hideLoadingScreen, 3000);
}

function draw() {
  for (var i = 0; i < speed; i++) {
    for (let j = 0; j < agents.length; j++) {
      agents[j].move();
    }
  }

  frameCounter++; // Increment frame counter

  // Check if it's time to refresh
  if (frameCounter >= 10 * 60) {
    // 10 seconds
    refreshScreen();
    frameCounter = 0; // Reset frame counter
  }
}

function keyReleased() {
  if (key == "s" || key == "S") saveCanvas("screenshot", "png");
  if (keyCode == DELETE || keyCode == BACKSPACE) background(0); // Reset to black background
}

class Agent {
  constructor() {
    this.posX = floor(random(width));
    this.posY = floor(random(height));
    this.direction = random(TWO_PI); // Random initial direction
    this.prevPosX = this.posX;
    this.prevPosY = this.posY;
  }

  move() {
    // Draw line from previous position to current position
    strokeWeight(lineWidth); // Line thickness
    stroke(255); // White color
    line(this.prevPosX, this.prevPosY, this.posX, this.posY);

    // Update previous position
    this.prevPosX = this.posX;
    this.prevPosY = this.posY;

    // Make step
    this.direction += random(-PI / 8, PI / 8); // Random angle change
    this.posX += cos(this.direction) * stepSize;
    this.posY += sin(this.direction) * stepSize;

    // Check if agent is near one of the display borders
    if (
      this.posY <= 0 ||
      this.posX >= width ||
      this.posY >= height ||
      this.posX <= 0
    ) {
      // Wrap around if near the border
      this.posX = random(width);
      this.posY = random(height);
    }
  }
}

function hideLoadingScreen() {
  var loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "none";
}

function refreshScreen() {
  background(0); // Clear the canvas
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
