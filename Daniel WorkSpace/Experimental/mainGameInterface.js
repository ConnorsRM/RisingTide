//Interface Set Up for the main Game

var mainGame = new Interface();

//Stores PlayerIndex
var CameraIndex;
var IslandIndex;
var PlayerIndex;

//2 second delay between damn builds
var DAM_DELAY =  2000;
var lastDamBuild = new Date().getTime();

mainGame.init = function() {
    this.id = InterfaceStack.push(this);
    
    SeaLevelRise = 0.001;
    var playerStartingPos = {x: 400, y: 300};
    
    //Creating Objects
    CameraIndex = this.obj_array.push(new Camera(playerStartingPos)) - 1;
    IslandIndex = this.obj_array.push(new TileEngine(100, 100, 40)) - 1;
    PlayerIndex = this.obj_array.push(new Player(playerStartingPos)) - 1;
	GUIIndex    = this.obj_array.push(new GUI()) - 1;
    var tileSize = this.obj_array[IslandIndex].cellSize;
    for (var i = 0; i < 500; ++i) {
        var xpos = 0;
        var ypos = 0;
        var xcell = Math.floor(Math.random() * 100);
        var ycell = Math.floor(Math.random() * 100);
        var cell = this.obj_array[IslandIndex].getCell({x:xcell, y:ycell});
        console.log(String(xcell) + String(ycell));
        while ((cell.entity != null) || (cell.elevation <= 0)) {
            xcell = Math.floor(Math.random() * 100);
            ycell = Math.floor(Math.random() * 100);
            cell = this.obj_array[IslandIndex].getCell({x:xcell, y:ycell});
        }
        xpos = xcell * tileSize + 20;
        ypos = ycell * tileSize + 35;
        this.obj_array.push(new Tree(this.obj_array[IslandIndex], {x:xpos, y:ypos})) - 1;
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
        } else if(e.keyCode == 16) {   //Shift Key
            //Display Evaluation Overlay
        	this.obj_array[IslandIndex].isOverlay = status;
        }
    };
};
