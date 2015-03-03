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
    ImageLoader.loadImage(water, "images/water.png");
    ImageLoader.loadImage(sand, "images/sand.png");
    ImageLoader.loadImage(grass, "images/grass.png");
    
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

