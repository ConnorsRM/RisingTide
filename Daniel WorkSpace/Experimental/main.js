// Daniel Luna
//-----------------------------------------------------
// Game Creation and Update
//-----------------------------------------------------

//All variables of global scope are capitalized

//Global Game Variables
var Canvas;
var Context;
var FramesPerSecond = 30;

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


//Sprites and Animations
var playerSprite;
//PlayerSprite Animations
var walkDown;
var walkLeft;
var walkUp;
var walkRight;
var stabRight;
var stabLeft;


function loadGame() {
    //All loading of game resources should be done in this function
    //  which should be called before all other functions.
    
    //Get the Canvas and the Context
    Canvas = document.getElementById('canvas');
    Context = Canvas.getContext('2d');
    
    //Set Up The Initial Interface
    mainGame.init();
    
    //Initialize Sprites
    mainGame.obj_array[PlayerIndex].spr = new Sprite(881, 335, 70, 42);
    
    //Set up imageLoader
    ImageLoader = new imgLoader(initGame);
    ImageLoader.loadImage(water, "images/water.png");
    ImageLoader.loadImage(sand, "images/sand.png");
    ImageLoader.loadImage(grass, "images/grass.png");
    ImageLoader.loadImage(mainGame.obj_array[PlayerIndex].spr.image, "images/playersheetTrans.png");
    
    var playerSprite = mainGame.obj_array[PlayerIndex].spr;
    
    //Set up playerSprite Animations
    walkDown = playerSprite.loadAnimation(0, 3);
    walkLeft = playerSprite.loadAnimation(4, 7);
    walkUp = playerSprite.loadAnimation(16, 19);
    walkRight = playerSprite.loadAnimation(20, 23);
    stabRight = playerSprite.loadAnimation(28,31);
    stabLeft = playerSprite.loadAnimation(42,45);
    
    //Set up to initialize the game
    ImageLoader.callWhenReady();
};


function initGame() {
    //This function should be called to reset the game to it's initial
    //  status.
    
    //Init Island Tile Images
    mainGame.obj_array[IslandIndex].loadTile(water);
    mainGame.obj_array[IslandIndex].loadTile(sand);
    mainGame.obj_array[IslandIndex].loadTile(grass);
    
    //Starts Game Loop
    setInterval(update, 1000 / FramesPerSecond);
};


function update() {
    //This function is called every game step. It steps through
    //  all of the objects in obj_array and calls their update 
    //  function.
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

