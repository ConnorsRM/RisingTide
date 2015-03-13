//Interface Set Up for the main Game

var mainGame = new Interface();
var updateID;
var PauseSpamSlayer = true;

//Stores PlayerIndex
var CameraIndex;
var IslandIndex;
var PlayerIndex;

//2 second delay between damn builds
var DAM_DELAY =  2000;
var lastDamBuild = new Date().getTime();

mainGame.init = function() {
    this.id = InterfaceStack.push(this);

	//this is for the case of reinitialization
	this.obj_array = [];
	this.sqrl_array = [];
    
    SeaLevelRise = 0.001;
    var playerStartingPos = {x: 400, y: 300};
    
    //Creating Objects
    CameraIndex = this.obj_array.push(new Camera(playerStartingPos)) - 1;
    IslandIndex = this.obj_array.push(new TileEngine(100, 100, 40)) - 1;
	GUIIndex    = this.obj_array.push(new GUI()) - 1;
	HungerIndex = this.obj_array.push(new Hunger(100, 8)) - 1;
    PlayerIndex = this.obj_array.push(new Player(playerStartingPos)) - 1;

	
	//Init Island Tile Images
    mainGame.obj_array[IslandIndex].loadTile(water);
    mainGame.obj_array[IslandIndex].loadTile(sand);
    mainGame.obj_array[IslandIndex].loadTile(grass);
	
	//Sqrl initial population
	for (var index = 0; index < MAX_SQRL_COUNT; ++index ){
		var newX = Math.floor((Math.random() * (WORLD_DIMENSION - 300))  + 300);
		var newY = Math.floor((Math.random() * (WORLD_DIMENSION - 300))  + 300);
		var newSqrl = new Sqrl(this.obj_array[IslandIndex], {x:newX, y:newY});
		this.obj_array.push(newSqrl);
		this.sqrl_array.push(newSqrl);
	}
	
    var tileSize = this.obj_array[IslandIndex].cellSize;
    var TreeTotal = 200;
    var MinClumpSize = 10;   //In Trees
    var MaxClumpSize = 14;  //In Trees
    var ClumpRadius = 4;    //In Tiles
    for (var i = 0; i < TreeTotal;) {
        var xpos = 0;
        var ypos = 0;
        var xorigin = ClumpRadius + 2 + Math.floor(Math.random() * (98 - (ClumpRadius * 2)));
        var yorigin = ClumpRadius + 2 + Math.floor(Math.random() * (98 - (ClumpRadius * 2)));
        var xcell = xorigin;
        var ycell = yorigin;
        var cell = this.obj_array[IslandIndex].getCell({x:xcell, y:ycell});
        var ClumpSize = MinClumpSize + Math.floor(Math.random() * (MaxClumpSize - MinClumpSize)) + 1;
        for (var j = 0; (i < TreeTotal) && (j < ClumpSize); ++i) {
            if (i == 0) {
                xorigin = 8;
                yorigin = 14;
            }
            do {
                xcell = xorigin + Math.floor(Math.random() * (ClumpRadius * 2)) - ClumpRadius;
                ycell = yorigin + Math.floor(Math.random() * (ClumpRadius * 2)) - ClumpRadius;
                cell = this.obj_array[IslandIndex].getCell({x:xcell, y:ycell});
            } while ((cell.entity != null) || (cell.elevation <= 0)); 
            xpos = xcell * tileSize + 20;
            ypos = ycell * tileSize + 35;
            this.obj_array.push(new Tree(this.obj_array[IslandIndex], {x:xpos, y:ypos})) - 1;
            ++j;
        }
    }
    
    //Initializing Internal Vars
    this.active = true;
    this.visible = true;
    this.drawFrame = 0;
    this.updateFrame = 0;
    
    //Input Definitions
    this.inputHandler = function(e, status) {
        if (e.keyCode == 87) {  //W
            //Move Up
            this.obj_array[PlayerIndex].inputVars[0] = status;
        } else if (e.keyCode == 83) {  //S
            //Move Down
            this.obj_array[PlayerIndex].inputVars[1] = status;
        } else if (e.keyCode == 65) {  //A
            //Move Left
            this.obj_array[PlayerIndex].inputVars[2] = status;
        } else if (e.keyCode == 68) {  //D
            //Move Right
            this.obj_array[PlayerIndex].inputVars[3] = status;
        } else if (e.keyCode == 81) {  //Q
            //Cycle Item Left
            this.obj_array[PlayerIndex].inputVars[4] = status;
        } else if (e.keyCode == 69) {  //E
            //Cycle Item Right
            this.obj_array[PlayerIndex].inputVars[5] = status;
        } else if (e.keyCode == 38) {  //Up Arrow Key
            //Use Item Up
            this.obj_array[PlayerIndex].inputVars[6] = status;
        } else if (e.keyCode == 40) {  //Down Arrow Key
            //Use Item Down
            this.obj_array[PlayerIndex].inputVars[7] = status;
        } else if (e.keyCode == 37) {  //Left Arrow Key
            //Use Item Left
            this.obj_array[PlayerIndex].inputVars[8] = status;
        } else if (e.keyCode == 39) {  //Right Arrow Key
            //Use Item Right
            this.obj_array[PlayerIndex].inputVars[9] = status;
        } else if (e.keyCode == 16) {   //Shift Key
            //Display Evaluation Overlay
        	this.obj_array[IslandIndex].isOverlay = status;
        } else if (e.keyCode == 32 && gameOver == true) {
			//reset game code here
			gameOver = false;
			this.activate();
			InterfaceStack[0].visible = true;
			this.remove();
		} else if (e.keyCode == 80) {   //P Key
		    //Pause Game
		    if (status && PauseSpamSlayer) {
		      if (this.active)
    		      this.deactivate();
    	      else
	              this.activate();
			  
				
              PauseSpamSlayer = false;
	       } else if (!(status))
	           PauseSpamSlayer = true;
		   
		} else if (e.keyCode == 79) {
		    var cellToPrint = this.obj_array[IslandIndex].posToCell({x:this.obj_array[PlayerIndex].x, y:this.obj_array[PlayerIndex].y}); 
		    console.log("(" + String(cellToPrint.x) + ", " + String(cellToPrint.y) + ")");
		}
    };
};
