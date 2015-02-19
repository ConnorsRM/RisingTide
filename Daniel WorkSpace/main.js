// Daniel Luna
//-----------------------------------------------------
// Game Creation and Update
//-----------------------------------------------------

//Initialize some global variables about the working space:
var canvas;
var context;
var c_width;
var c_height;
var FPS = 30;   //FramesPerSecond

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
    context = canvas.getContext("2d");
    c_width = canvas.width;
    c_height = canvas.height;
    
    //Load Images
    imageLoader = new imgLoader(initGame);
    imageLoader.loadImage(water, "water.png");
    imageLoader.loadImage(sand, "sand.png");
    imageLoader.loadImage(grass, "grass.png");
    
    tileEngine = new TileEngine(10, 15, 40);    //Set Tile Size and World Size
    tileEngine.loadTile(water);
    tileEngine.loadTile(sand);
    tileEngine.loadTile(grass);
    
    imageLoader.callWhenReady();
};


function initGame() {
    for (var x = 0; x < 10; ++x) {
        for (var y = 0; y < 20; ++y) {
            tileEngine.getCell({x: x, y: y}).tile = Math.floor(3*Math.random());
        }
    }
    
    //Draws Whole Map
    tileEngine.draw({x: 0, y: 400});
    
    //Draws Cell (5, 5)
    tileEngine.drawCell({x: 440, y: 20}, {x:5, y:5});
    
    //Draws Region
    tileEngine.drawSection({x:0, y:0}, {x:20, y:50}, {x:300, y:400});
    
    console.log("Drawn at (10, 20)");
    setInterval(update, 1000 / FPS);
};


function update() {
    for (var i = 0; i < InterfaceStack.length; ++i) {
        InterfaceStack[i].update();
    }
};


function draw() {
    for (var i = 0; i < InterfaceStack.length; ++i) {
        InterfaceStack[i].draw();
    }
};
