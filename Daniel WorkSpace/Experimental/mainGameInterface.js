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
        } else if(e.keyCode == 88 ) {   // X Key
			//delay for damn builds
			var thisTime = new Date().getTime();
			if( thisTime - lastDamBuild > DAM_DELAY){
				
				lastDamBuild = thisTime;
				
				//Dam Creation
				//this can be cleaned up into a function, but for
				//now.. it works
			
				var pPos = {x:this.obj_array[PlayerIndex].x,
							y:this.obj_array[PlayerIndex].y};
			
				var cell = this.obj_array[IslandIndex].posToCell(pPos);
				this.obj_array[IslandIndex].posToCell(pPos).elevation += 1;
				var dPos = this.obj_array[IslandIndex].cellToPos(cell);
			
				var newDam = new Dam(dPos);
				var newIndex = this.obj_array.push(newDam) - 1;
				this.obj_array[newIndex].ifsIndex = newIndex;
				this.obj_array[newIndex].elevation =
					this.obj_array[IslandIndex].posToCell(pPos).elevation;
			}
			
		}
    };
};
