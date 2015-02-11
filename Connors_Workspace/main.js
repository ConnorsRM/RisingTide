//-----------------------------------------------------
// Game Creation and Update
//-----------------------------------------------------

//Initialize some global variables about the working space:
var canvas;
var context;
var c_width;
var c_height;

//Create images
var gameImages = 3;
var loadedImages = 0;
var water;
var sand;
var grass;

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
    water = new Image();
    water.src = "water.png";
    water.onload = imageLoad;
    sand = new Image();
    sand.src = "sand.png";
    sand.onload = imageLoad;
    grass = new Image();
    grass.src = "grass.png";
    grass.onload = imageLoad;
    
    tileEngine = new TileEngine(10, 15, 40);
    tileEngine.loadTile(water);
    tileEngine.loadTile(sand);
    tileEngine.loadTile(grass);
};


function imageLoad() {
    ++loadedImages;
    if (loadedImages == gameImages) {
        initGame();
    }
};


function initGame() {
    for (var x = 0; x < 10; ++x) {
        for (var y = 0; y < 20; ++y) {
            tileEngine.getCell({x: x, y: y}).tile = Math.floor(3*Math.random());
        }
    }
    /*
    //Draws Whole Map
    tileEngine.draw({x: 0, y: 400});
    
    //Draws Cell (5, 5)
    tileEngine.drawCell({x: 440, y: 20}, {x:5, y:5});
    
    //Draws Region
    tileEngine.drawSection({x:0, y:0}, {x:20, y:50}, {x:300, y:400});
    */
    var cam = new Camera(150, 150, 300, 300);
    cam.moveCamera(165, 165);
    console.log(cam.x);
    
    
    
    //will be player encapsulation when defined
    cam.camDraw(tileEngine, undefined);
    console.log("Drawn at (10, 20)");
};
