// Daniel Luna
//-----------------------------------------------------
// Game Creation and Update
//-----------------------------------------------------

//Initialize some global variables about the working space:
var canvas;
var Context;
var c_width;
var c_height;
var FPS = 1;   //FramesPerSecond
var currFrame = 0;
var playerSprite = new Sprite(720, 360, 30, 43);
var walkDown = playerSprite.loadAnimation(0, 3);
var walkLeft = playerSprite.loadAnimation(4, 7);
var walkUp = playerSprite.loadAnimation(16, 19);
var walkRight = playerSprite.loadAnimation(20, 23);
var stabRight = playerSprite.loadAnimation(28, 31);
var stabLeft = playerSprite.loadAnimation(42, 45);

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
var eat = new Audio("playerSounds/eat.mp3")




//Create images
var imageLoader;
var water = new Image();
var sand = new Image();
var grass = new Image();

//tile engine
var tileEngine;

function gameLoad() {
    console.log("gameLoad();");
    //Anything in here will be done only on load:
    canvas = document.getElementById("canvas");
    Context = canvas.getContext("2d");
    c_width = canvas.width;
    c_height = canvas.height;

    //Load Images
    imageLoader = new imgLoader(initGame);
    imageLoader.loadImage(water, "water.png");
    imageLoader.loadImage(sand, "sand.png");
    imageLoader.loadImage(grass, "grass.png");
    imageLoader.loadImage(playerSprite.image, "finalplayer.png");

    tileEngine = new TileEngine(10, 15, 40);    //Set Tile Size and World Size
    tileEngine.loadTile(water);
    tileEngine.loadTile(sand);
    tileEngine.loadTile(grass);

    imageLoader.callWhenReady();
}
;


function initGame() {
    setInterval(update, 1000 / FPS);
}
;



function update() {
    Context.clearRect(0, 0, canvas.width, canvas.height);

    playerSprite.draw(walkDown, currFrame, 10, 10);
    if (currFrame <= 2) {
        currFrame++;
    } else
        currFrame = 0;
}
;


function draw() {

}
;