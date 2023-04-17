
let game 
let gmConsole = new Console();
let inputs = new Input();

function setup() {
  game = new Game(600,400);
  frameRate(60);
  createCanvas(game.gScreen.width, game.gScreen.height);
  execScripts();
}

function draw() {
  if(inputs.values.play) {
    game.update();
  }
  gmConsole.update();
}