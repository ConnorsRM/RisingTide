// Daniel Luna
//-----------------------------------------------------
// Game Creation and Update
//-----------------------------------------------------

//All variables of global scope are capitalized

//Global Game Variables
var Canvas;
var Context;
var FramesPerSecond = 30;
//Sound Loader isnt working so im just gonna implement this terribly as of now
var waterRise = new Audio("ambientSounds/waterRising1.wav");
var waterRise2 = new Audio("ambientSounds/waterRising2.wav");
var waterRise3 = new Audio("ambientSounds/waterRising3.wav");
var chop = new Audio("itemSounds/axe/chop1.wav");
var chop2 = new Audio("itemSounds/axe/chop2.wav");
var chop3 = new Audio("itemSounds/axe/chop3.wav");
var chop4 = new Audio("itemSounds/axe/chop4.wav");
var chop5 = new Audio("itemSounds/axe/chop5.wav");
var chop6 = new Audio("itemSounds/axe/chop6.wav");
var walk = new Audio("playerSounds/walk.wav");
var eat = new Audio("playerSounds/eat.wav")
var equip = new Audio("playerSounds/equip.wav");

//Image Loader
var ImageLoader;
//Images to Load Go Here:
var water = new Image();
var sand = new Image();
var grass = new Image();

//score
var scoreKeeper = new score();

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

    //load the sounds


    //Set up to initialize the game
    ImageLoader.callWhenReady();
}
;


function initGame() {
    //This function should be called to reset the game to it's initial
    //  status.

    //Init Island Tile Images
    mainGame.obj_array[IslandIndex].loadTile(water);
    mainGame.obj_array[IslandIndex].loadTile(sand);
    mainGame.obj_array[IslandIndex].loadTile(grass);

    //Starts Game Loop
    setInterval(update, 1000 / FramesPerSecond);
}
;


function update() {
    //This function is called every game step. It steps through
    //  all of the objects in obj_array and calls their update 
    //  function.
    for (var i = 0; i < InterfaceStack.length; ++i) {
        InterfaceStack[i].update();
    }

    draw();
}
;


function draw() {
    //This function is called every game step. It steps through
    //  all of the objects in obj_array and calls their draw function.
    Context.clearRect(0, 0, Canvas.width, Canvas.height);

    for (var i = 0; i < InterfaceStack.length; ++i) {
        InterfaceStack[i].draw();
    }
}
;

