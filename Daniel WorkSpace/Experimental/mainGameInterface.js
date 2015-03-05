//Interface Set Up for the main Game

var mainGame = new Interface();

//Stores PlayerIndex
var CameraIndex;
var IslandIndex;
var PlayerIndex;

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
        } 
        if (e.keyCode == 83) {  //S
            //Move Down
            this.obj_array[PlayerIndex].inputVars[1] = status;
        } 
        if (e.keyCode == 65) {  //A
            //Move Left
            this.obj_array[PlayerIndex].inputVars[2] = status;
        } 
        if (e.keyCode == 68) {  //D
            //Move Right
            this.obj_array[PlayerIndex].inputVars[3] = status;
        }
        if (e.keyCode == 40) {  //Down Arrow Key
            //Cycle Item Right
            this.obj_array[PlayerIndex].inputVars[4] = status;
        }
        if (e.keyCode == 38) {  //Up Arrow Key
            //Cycle Item Left
            this.obj_array[PlayerIndex].inputVars[5] = status;
        }
        if (e.keyCode == 37) {  //Left Arrow Key
            //Use Item Left
            this.obj_array[PlayerIndex].inputVars[6] = status;
        }
        if (e.keyCode == 39) {  //Right Arrow Key
            //Use Item Right
            this.obj_array[PlayerIndex].inputVars[7] = status;
        }
    };
};
