var GAME_WIDTH = 760;
var GAME_HEIGHT = 550;
var GAME_SCALE = 4;
var DIM = 16;

var gameport = document.getElementById("gameport");
var renderer = new PIXI.autoDetectRenderer(GAME_WIDTH,
                                           GAME_HEIGHT,
                                           {backgroundColor: 0x99D5FF});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();
stage.scale.x = GAME_SCALE;
stage.scale.y = GAME_SCALE;

// Scene objects get loaded in the ready function
var johnRun;
var world;
var bombs;
var steps;
var coins

// Character movement constants:
var MOVE_LEFT = 1;
var MOVE_RIGHT = 2;
var MOVE_UP = 3;
var MOVE_DOWN = 4;
var MOVE_NONE = 0;

// The move function starts or continues movement
function move() {

  if (johnRun.direction == MOVE_NONE) {
    johnRun.moving = false;
    return;
  }

  var dx = 0;
  var dy = 0;

  if (johnRun.direction == MOVE_LEFT) dx -= 1;
  if (johnRun.direction == MOVE_RIGHT) dx += 1;
  if (johnRun.direction == MOVE_UP) dy -= 1;  
  if (johnRun.direction == MOVE_DOWN) dy += 1;

  if (water[(johnRun.gy+dy-1)*12 + (johnRun.gx+dx)] != 0) {
    johnRun.moving = false;
    return;
  }

  johnRun.gx += dx;
  johnRun.gy += dy;

  johnRun.moving = true;
  
  createjs.Tween.get(johnRun).to({x: johnRun.gx*DIM, y: johnRun.gy*DIM}, 250).call(move);

}

// Keydown events start movement
window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (!johnRun) return;
  if (johnRun.moving) return;
  if (e.repeat == true) return;
  
  johnRun.direction = MOVE_NONE;

  if (e.keyCode == 87)
    johnRun.direction = MOVE_UP;
  else if (e.keyCode == 83)
    johnRun.direction = MOVE_DOWN;
  else if (e.keyCode == 65)
    johnRun.direction = MOVE_LEFT;
  else if (e.keyCode == 68)
    johnRun.direction = MOVE_RIGHT;

  move();
});

// Keyup events end movement
window.addEventListener("keyup", function onKeyUp(e) {
  e.preventDefault();
  if (!johnRun) return;
  johnRun.direction = MOVE_NONE;
});

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

PIXI.loader
  .add('map.json')
  .add('tileSheet.png')
  .add('john1.png')
  .load(ready);

function ready() {
  createjs.Ticker.setFPS(60);
  var tu = new TileUtilities(PIXI);
  world = tu.makeTiledWorld("map.json", "tileSheeet.png");
  stage.addChild(world);

  johnRun = new PIXI.Sprite(PIXI.loader.resources["john1.png"].texture);
  johnRun.gx = 9;
  johnRun.gy = 5;
  johnRun.x = johnRun.gx*DIM;
  johnRun.y = johnRun.gy*DIM;
  johnRun.anchor.x = 0.0;
  johnRun.anchor.y = 1.0;

  // Find the entity layer
  var entities = world.getObject("john1");
  entities.addChild(johnRun);

  bombs = world.getObject("bombs").data;

  johnRun.direction = MOVE_NONE;
  johnRun.moving = false;
  animate();
}

function animate(timestamp) {
  requestAnimationFrame(animate);
  update_camera();
  renderer.render(stage);
}

function update_camera() {
  stage.x = -johnRun.x*GAME_SCALE + GAME_WIDTH/2 - johnRun.width/2*GAME_SCALE;
  stage.y = -johnRun.y*GAME_SCALE + GAME_HEIGHT/2 + johnRun.height/2*GAME_SCALE;
  stage.x = -Math.max(0, Math.min(world.worldWidth*GAME_SCALE - GAME_WIDTH, -stage.x));
  stage.y = -Math.max(0, Math.min(world.worldHeight*GAME_SCALE - GAME_HEIGHT, -stage.y));
}