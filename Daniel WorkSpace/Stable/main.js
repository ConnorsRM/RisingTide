// Daniel Luna
//-----------------------------------------------------
// Game Creation and Update
//-----------------------------------------------------

//All variables of global scope are capitalized

//Global Game Variables
var Canvas;
var Context;
var FramesPerSecond;

//Image Loader
var ImageLoader;
//Images to Load Go Here:
var water = new Image();
var sand = new Image();
var grass = new Image();


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
    playerSprite = new Sprite(480, 180, 30, 43);
    
    //Set up imageLoader
    ImageLoader = new imgLoader(initGame);
    ImageLoader.loadImage(water, "images/water.png");
    ImageLoader.loadImage(sand, "images/sand.png");
    ImageLoader.loadImage(grass, "images/grass.png");
    ImageLoader.loadImage(playerSprite.image, "images/playersheetTrans.png");
    
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
    
    for (var i = 0; i < InterfaceStack.length; ++i) {
        InterfaceStack[i].draw();
    }
};

