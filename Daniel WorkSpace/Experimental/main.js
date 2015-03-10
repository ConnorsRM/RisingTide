// Daniel Luna
//-----------------------------------------------------
// Game Creation and Update
//-----------------------------------------------------

//All variables of global scope are capitalized

//Global Game Variables
var Canvas;
var Context;
var FramesPerSecond = 30;
var gameOver = false;

//Image Loader
var ImageLoader;
//Images to Load Go Here:
var water = new Image();
var sand = new Image();
var grass = new Image();

//Input:
//Keyboard Listeners
addEventListener("keydown", function (e) {
    InterfaceStack[InterfaceStack.length - 1].inputHandler(e, true);
}, false);

addEventListener("keyup", function (e) {
    InterfaceStack[InterfaceStack.length - 1].inputHandler(e, false);
}, false);


function loadGame() {
    //All loading of game resources should be done in this function
    //  which should be called before all other functions.
    
    //Get the Canvas and the Context
    Canvas = document.getElementById('canvas');
    Context = Canvas.getContext('2d');
    
    //Set Up The Initial Interface
    mainGame.init();
    
    //Set up imageLoader
    ImageLoader = new imgLoader(initGame);
    mainGame.obj_array[PlayerIndex].load();
    ImageLoader.loadImage(TreeSprite.image, "images/palmtree1.png");
    ImageLoader.loadImage(water, "images/water.png");
    ImageLoader.loadImage(sand, "images/sand.png");
    ImageLoader.loadImage(grass, "images/grass.png");
	ImageLoader.loadImage(DAM_SPRITE.image, "images/dam.png");
	
	//GUI images
	ImageLoader.loadImage(AXE_SPRITE.image, "images/axe.png");
	ImageLoader.loadImage(SPEAR_SPRITE.image, "images/spear.png");
    ImageLoader.loadImage(CHICKEN_SPRITE.image, "images/meat.png");
	ImageLoader.loadImage(LOG_SPRITE.image, "images/log.png");
	ImageLoader.loadImage(SEL_SPRITE.image, "images/itemBorder.png");
	
	//Animal Images
	ImageLoader.loadImage(SQRL_SPRITE.image, "images/sqrl.png");
    
    //Load Sounds
    loadSounds();
    
    //Set up to initialize the game
    ImageLoader.callWhenReady();
};


function initGame() {
    //This function should be called to reset the game to it's initial
    //  status.
    
    //Starts Game Loop
    updateID = setInterval(update, 1000 / FramesPerSecond);
	console.log(updateID);
};


function update() {
    //This function is called every game step. It steps through
    //  all of the objects in obj_array and calls their update 
    //  function.
	
	if(gameOver) {	
		var totScore = new score();
		var timeAlive    = mainGame.obj_array[PlayerIndex].score;
		var damsMade     = mainGame.obj_array[PlayerIndex].damsMade;
		var timeDrowning = mainGame.obj_array[PlayerIndex].timeDrowning;

		totScore.displayScore(timeAlive, damsMade, timeDrowning);
		return;
	}
	
	
    for (var i = 0; i < InterfaceStack.length; ++i) {
        InterfaceStack[i].update();
    }
    draw();
}; 


function draw() {
    //This function is called every game step. It steps through
    //  all of the objects in obj_array and calls their draw function.
    Context.clearRect(0, 0, Canvas.width, Canvas.height);
    
    for (var i = 0; i < InterfaceStack.length; ++i) {
        InterfaceStack[i].draw();
    }
};

