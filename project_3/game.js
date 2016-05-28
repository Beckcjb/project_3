var GAME_WIDTH = 760;
var GAME_HEIGHT = 550;
var GAME_SCALE = 1;
// var HORIZON_Y = GAME_HEIGHT/GAME_SCALE/2;

var gameport = document.getElementById("gameport");
var renderer = new PIXI.autoDetectRenderer(GAME_WIDTH,
                                           GAME_HEIGHT,
                                           {backgroundColor: 	0x0000FF});

										   gameport.appendChild(renderer.view);
/* 	Creste Stage, home, turoiral, play, credits containers,
	Create buttons and background objects */

//allocate memory for variables. 

var stage = new PIXI.Container();
stage.scale.x = GAME_SCALE;
stage.scale.y = GAME_SCALE;

PIXI.loader
	.add('assets.json')
	.add('map.json')
	.add('tileSheet.png')
	.load(ready)
 // Ready method creates sprite movie clips 

var johnRun;
var zorg;  
var home;
var playlvl; 
var credits;
var tutorial;
var creditsPage;
var loseScreen;
var winScreen;
var losetext;
var wintext;
var homeButton;
var homeButtonS;
var homeButtonM;
var title;
var playButton;
var creditsButton;
var tutorialButton;
var tutorialPage;
var finish;
var count;
var world;
var lvl;
var player;
var tu;
var bombs;
var coins;
var steps;
var game_state = 0;
var bombs_layer;
var steps_layer;
var coins_layer;
function ready() {

  var frames = [];

  for (var i=1; i<=4; i++) {
    frames.push(PIXI.Texture.fromFrame('john' + i + '.png'));

  }


  
  johnRun = new PIXI.extras.MovieClip(frames);
  johnRun.anchor.x = .5;
  johnRun.anchor.y = 0;
	johnRun.position.x = (32*7);
  johnRun.position.y = (32*29);  
  johnRun.animationSpeed = .13;

zorg = new PIXI.Sprite(PIXI.Texture.fromFrame('zorg.png'));
finish = new PIXI.Sprite(PIXI.Texture.fromFrame('finish.png'));
  
	creditsPage = new PIXI.Sprite(PIXI.Texture.fromFrame("creditsPage.png"));
	homeButton = new PIXI.Sprite(PIXI.Texture.fromFrame("homeButton.png"));
	homeButtonS = new PIXI.Sprite(PIXI.Texture.fromFrame("homeButtonS.png"));
	homeButtonM = new PIXI.Sprite(PIXI.Texture.fromFrame("homeButtonM.png"));
	title = new PIXI.Sprite(PIXI.Texture.fromFrame("title.png"));
	playButton = new PIXI.Sprite(PIXI.Texture.fromFrame("playButton.png"));
	creditsButton = new PIXI.Sprite(PIXI.Texture.fromFrame("creditsButton.png"));
	tutorialButton = new PIXI.Sprite(PIXI.Texture.fromFrame("tutorialButton.png"));
	tutorialPage = new PIXI.Sprite(PIXI.Texture.fromFrame("tutorialPage.png"));
	losetext = new PIXI.Sprite(PIXI.Texture.fromFrame("loseScreen.png"))
	wintext = new PIXI.Sprite(PIXI.Texture.fromFrame("winScreen.png"))
	count = 0;
	
	
	tu = new TileUtilities(PIXI);
    world = tu.makeTiledWorld('map.json', 'tileSheet.png');
	// add in the world in the paly section
	
	
 	bombs_layer = world.getObject('bombs');
	coins_layer = world.getObject('coins');
	steps_layer = world.getObject('steps');
	

	 
	



	// Set sprites to interactive
	playButton.interactive = true;
	creditsButton.interactive = true;
	tutorialButton.interactive = true;
	homeButton.interactive = true;
	homeButtonS.interactive = true;
	homeButtonM.interactive = true;
	
	// Handle mousedown event on interactives
	tutorialButton.on('mousedown', mouseClickTutorial)
	playButton.on('mousedown', mouseClickPlay);
	homeButton.on('mousedown', mouseClickHome);
	creditsButton.on('mousedown', mouseClickCredits);
	homeButtonS.on('mousedown', mouseClickHome);
	homeButtonM.on('mousedown', mouseClickHome);
 	
	

	
	titleScreen(); 
	animate();
  }
	
	
home = new PIXI.Container();
playlvl = new PIXI.Container();
credits = new PIXI.Container();
tutorial = new PIXI.Container();
loseScreen = new PIXI.Container();
winScreen = new PIXI.Container();


//add Home to stage

// =================================================================================
// Set title position
	var song;
	song = new Audio('titleSong.mp3');
	var hit;
	hit = new Audio('hit.wav');
	
	var won;
	won = new Audio('win.wav');
	
	var lost;
	lost	= new Audio('lose.wav');
/* 	
	var coin;
	coin = new Audio('coin.wav');
	
	var jump;
	jump = new Audio('jump.wav'); */
	
function titleScreen(){
	game_state = 0;
	stage.addChild(home);

	song.play();
	home.alpha = 1;
	title.anchor.x = 0.5;
	title.anchor.y = 0.5;
	title.position.x = GAME_WIDTH/2;
	title.position.y = GAME_HEIGHT/2;


 	// Set button positions
	playButton.position.x = 315;
	playButton.position.y = 350;

	creditsButton.position.x = 449;
	creditsButton.position.y = 350;

	tutorialButton.position.x = 179;
	tutorialButton.position.y = 350;

	// Add sprites to Home page
	home.addChild(title);
	home.addChild(tutorialButton);
	home.addChild(playButton);
	home.addChild(creditsButton); 
	
}
function creditsScreen(){
	game_state = 2;
	// Add sprites to Credits Page
	credits.addChild(creditsPage);
	credits.addChild(homeButton);
	
	homeButton.position.x = 250;
	homeButton.position.y = 300;
	stage.addChild(credits);

}
function playScreen(){
	game_state = 1;
	
	stage.addChild(world);
	stage.addChild(finish);
	stage.addChild(zorg);
	zorg.position.y = (32*29);
	zorg.position.x = (32*1)
	finish.position.x = (32*245);
	finish.position.y = (32*27);
	finish.anchor.x = .5;
	song.currentTime = 0;
	song.play();
	playlvl.addChild(johnRun);
	var count =1;
 	playlvl.addChild(bombs_layer);
	playlvl.addChild(coins_layer);
	playlvl.addChild(steps_layer); 
	playlvl.addChild(homeButtonS);
	stage.addChild(playlvl);
	homeButtonS.scale.x = .25;
	homeButtonS.scale.y = .25;
	homeButtonS.position.x = 650;
	homeButtonS.position.y = 5;
}

function tutorialSceen(){
	game_state = 3;
	stage.addChild(tutorial);
	tutorial.addChild(tutorialPage);
	tutorial.addChild(homeButtonM);
	
	homeButtonM.scale.x = .25;
	homeButtonM.scale.y = .25;
	homeButtonM.position.x = 650;
	homeButtonM.position.y = 5;
	song.pause();
	song.currentTime = 0;
	
	}
 function lose(){
	stage.removeChild(world);
	stage.addChild(loseScreen);
	loseScreen.addChild(losetext);
	loseScreen.addChild(homeButtonM);

	losetext.position.x = johnRun.position.x;
	losetext.position.y = johnRun.position.y;
	losetext.anchor.x = .5;
	losetext.anchor.y = .525;
	homeButtonM.scale.x = .25;
	homeButtonM.scale.y = .25;
	homeButtonM.position.x = johnRun.position.x;
	homeButtonM.position.y = johnRun.position.y;
	homeButtonM.anchor.x = .5;
	homeButtonM.anchor.y = .525;
	homeButtonM.position.x = 650;
	homeButtonM.position.y = 5;
	loseScreen.alpha = 1;
	lost.play();

	}
function win(){
	stage.removeChild(world);
	stage.addChild(winScreen);
	winScreen.addChild(wintext);
	winScreen.addChild(homeButtonM);
	
	wintext.position.x = (32*238);
	wintext.position.y = (32*29);
	wintext.anchor.x = .5;
	wintext.anchor.y = .525;
	homeButtonM.scale.x = .25;
	homeButtonM.scale.y = .25;
	homeButtonM.position.x = johnRun.position.x;
	homeButtonM.position.y = johnRun.position.y;
	homeButtonM.anchor.x = .5;
	homeButtonM.anchor.y = .525;
	homeButtonM.position.x = 660;
	homeButtonM.position.y = 5;
	winScreen.alpha = 1;
	won.play();
	
	} 
	
// Handle Mouse Click on Credits
function mouseClickCredits(e) {
	credits.alpha = 1;
	home.alpha = 0;
	stage.addChild(credits);
	creditsScreen();
	
	}

// Handle Mouse Click on Home	
function mouseClickHome(e) {
	credits.alpha = 0;
	home.alpha = 1;
	playlvl.alpha = 0;
	tutorial.aplha = 0;
	lose.alpha = 0;
	win.aplha = 0;
	titleScreen();
	ready();
	}

// Handle Mouse Click on Play 	
function mouseClickPlay(e) {
	playlvl.alpha = 1;
	home.alpha = 0;
	playScreen();

	}	
	
function mouseClickTutorial(e) {
	credits.alpha = 0;
	home.alpha = 0;
	playlvl.alpha = 0;
	tutorial.alpha = 1;
	tutorialSceen();

	}

	



document.addEventListener("keydown", onKeyDown), false;

// Keydown handler for character movement
function onKeyDown(key) {
	

	 var x = johnRun.position.x;
	
	if (key.keyCode === 65 ) { // left
		if(johnRun.position.x != 0){
	createjs.Tween.get(johnRun.position).to({x: x - 32}, 10, createjs.Ease.linear);		
	johnRun.scale.x = -1;
		johnRun.play();}
    }
	if (key.keyCode === 65 && key.keyCode === 87 ) { // left
		if(johnRun.position.x != 0){
		createjs.Tween.get(johnRun.position).to({x: x - 32 }, 10, createjs.Ease.linear);
			johnRun.scale.x = -1;
				johnRun.play();
				audio.play();}
    }
	if (key.keyCode === 68 && key.keyCode === 87  ) { // right
		if(johnRun.position.x != 0){
        createjs.Tween.get(johnRun.position).to({x: x + 32}, 10,createjs.Ease.linear);
		johnRun.scale.x = -1;
		johnRun.play();
		audio.play();}
    }
    if (key.keyCode === 68 ) { // right
	
	
		createjs.Tween.get(johnRun.position).to({x: x + 32}, 10,createjs.Ease.linear);			
		johnRun.scale.x = 1;
			johnRun.play();
		

        }
	  if(key.keycode === 83){
		
		johnRun.gotoAndStop(1);
	}
    
}

document.addEventListener("keyup", onKeyRelease), false;

// KeydReleaseown handler for character movement
function onKeyRelease(key) {
	
	//if(key.keyCode === 87 ){
		
	//}

    if (key.keyCode === 65 ) { // left
		johnRun.gotoAndStop(1); 
		}
  
    if (key.keyCode === 68 ) { // right

		johnRun.gotoAndStop(1);
        }
    if(key.keycode === 83){
		
		johnRun.gotoAndStop(1);
	}
}

 
// function for testing hits with rectangles
function hitRectangle(r1, r2) {
	
	// Variables needed to test if there is a hit
	var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
	
	// Hit or not
	hit = false;
	
	// Finds the center of the rectangular sprites (only works with rectangles/boxes)
	r1.centerX = r1.x + r1.width / 2;
	r1.centerY = r1.y + r1.height / 2;
	r2.centerX = r2.x + r2.width / 2;
	r2.centerY = r2.y + r2.height / 2;
	
	// Divides the Height and Width by two and stores the values.
	r1.halfWidth = r1.width / 2;
	r1.halfHeight = r1.height / 2;
	r2.halfWidth = r2.width / 2;
	r2.halfHeight = r2.height / 2;
	
	// Checks the distances between centers on X and Y axis
	vx = r1.centerX - r2.centerX;
	vy = r1.centerY - r2.centerY;
	
	// Combination of sprite width's and heights
	combinedHalfWidths = r1.halfWidth + r2.halfWidth;
	combinedHalfHeights = r1.halfHeight + r2.halfHeight;
	
	// Collision on the x axis ?
	if (Math.abs(vx) < combinedHalfWidths) {
		// Collision on the y axis ?
		if (Math.abs(vy) < combinedHalfHeights) {
			  // Collision!
			  hit = true;
		} else {
			// No Collision
			hit = false;
    }
	} else {
		// No collision
		hit = false;
  }
	// Return true if hit
	return hit;
};

//function detects hit if true
function checkHit(){
	if(hitRectangle(johnRun, zorg)=== true){
		lose();
	}
	
	if(hitRectangle(johnRun, finish)=== true){
		win();
		game_state = 4;
	}
} 

 
//update the page
function animate() {
  requestAnimationFrame(animate);
  var x = johnRun.position.x;
	
	checkHit();
	while(game_state === 1){
	update_camera(); 
	break;
	}
	
	if(johnRun.position.x > (32*20)){
		 createjs.Tween.get(zorg.position).to({x:(32*240)}, 15000,createjs.Ease.linear);
	}
	if(johnRun.position.x > (32*244)){
		zorg.position.x = (32*5);
		 createjs.Tween.get(zorg.position).to({x:(32*4)}, 15000,createjs.Ease.linear);
	}

   createjs.Ticker.setFPS(60);
  renderer.render(stage);
  
}

function update_camera() {
  stage.x = -johnRun.x*GAME_SCALE + GAME_WIDTH/2 - johnRun.width/2*GAME_SCALE;
  stage.y = -johnRun.y*GAME_SCALE + GAME_HEIGHT/2 + johnRun.height/2*GAME_SCALE;
  stage.x = -Math.max(0, Math.min((32*250)*GAME_SCALE - GAME_WIDTH, -stage.x));
  stage.y = -Math.max(0, Math.min((32*50)*GAME_SCALE - GAME_HEIGHT, -stage.y));
}
 


