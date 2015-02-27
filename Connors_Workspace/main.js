//-----------------------------------------------------
// Game Creation and Update
//-----------------------------------------------------

//Initialize some global variables about the working space:
var canvas;
var context;
var c_width;
var c_height;
var FPS = 1;

//Create images
var gameImages = 3;
var loadedImages = 0;
var water;
var sand;
var grass;

//tile engine
var tileEngine;

var cam;
var player;
var obj_array = new Array();

//key tracking
var keysDown = {};


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
    
    tileEngine = new TileEngine(100, 100, 40);
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

//keyboard
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

function update() {
	// 1.) walk through all tiles
	// 2.) find those that should be flooded by checking elevation
	// 3.) are they in danger of flooding?
	// 4.) then flood them
	
	
	for (var x = 0; x < 100; ++x) {
		for (var y = 0; y < 100; ++y) {
			var thisTile = {x: x, y: y};
			if(tileEngine.getCell(thisTile).elevation - tileEngine.sea_level <= 0
				&& tileEngine.getCell(thisTile).danger) {
				tileEngine.getCell(thisTile).flooded = true;
				tileEngine.getCell(thisTile).tile = 0;
				tileEngine.propagateDanger(thisTile);
			}
			else if(tileEngine.getCell(thisTile).elevation - tileEngine.sea_level == 1) {
				
				if(tileEngine.getCell(thisTile).danger == true)
					tileEngine.getCell(thisTile).tile = 1;	
				}
		}
	}
	
	if(83 in keysDown) {
		cam.stepForCameraY();
	}
	
	if(87 in keysDown) {
		cam.stepBackCameraY();
	}
	if(68 in keysDown) {
		cam.stepForCameraX();
	}
	
	if(65 in keysDown) {
		cam.stepBackCameraX();
	}
	
	if(18 in keysDown) {
		var newDam = new Dam(player.x, player.y, tileEngine);
		obj_array.push(newDam);
	}
	
	/*for (obj in obj_array)
		obj.draw();
	*/
	cam.camDraw(tileEngine, player);
	
	tileEngine.sea_level = 2;
	
}

function initGame() {
    for (var x = 0; x < 100; ++x) {
        for (var y = 0; y < 100; ++y) {
        	var thisTile = {x: x, y: y};
        	
            switch(tileEngine.getCell(thisTile).elevation) {
            	case 0:
            		tileEngine.getCell(thisTile).tile = 0;
            		tileEngine.getCell(thisTile).flooded = true;
            		tileEngine.getCell(thisTile).danger = true;
            		break;
            	case 1:
            		tileEngine.getCell(thisTile).tile = 1;
            		tileEngine.getCell(thisTile).danger = true;
            		break;
            	default:
            		if(tileEngine.getCell(thisTile).danger == false) {
            			tileEngine.getCell(thisTile).tile = 2;
            		}
            		break
            }
        }
        
        tileEngine.sea_level = 0;
    }
    /*
    //Draws Whole Map
    tileEngine.draw({x: 0, y: 400});
    
    //Draws Cell (5, 5)
    tileEngine.drawCell({x: 440, y: 20}, {x:5, y:5});
    */
    //Draws Region
    //tileEngine.drawSection({x:0, y:0}, {x:400, y:400}, {x:1200, y:1200});
	
    
    cam = new Camera(150, 150, 800, 800);
    cam.iniCam(5);
    cam.moveCamera(500, 500);
    obj_array.push(cam);
    
    player = new Player();
    player.x = 300;
    player.y = 300;
    obj_array.push(player);
    /*
    tileEngine.sea_level = tileEngine.sea_level;
    update();
    
    
    //will be player encapsulation when defined
    cam.camDraw(tileEngine, player);
    */
   
	setInterval(update, 1000 / FPS);
};
