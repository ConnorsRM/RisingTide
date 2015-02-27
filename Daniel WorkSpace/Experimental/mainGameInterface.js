//Interface Set Up for the main Game

var mainGame = new Interface();

//Stores PlayerIndex
var CameraIndex;
var IslandIndex;
var PlayerIndex;

mainGame.init = function() {
    this.id = InterfaceStack.push(this);
    
    var playerStartingPos = {x: 0, y: 0};
    
    //Creating Objects
    CameraIndex = this.obj_array.push(new Camera(playerStartingPos)) - 1;
    IslandIndex = this.obj_array.push(new TileEngine(100, 100, 40)) - 1;
    PlayerIndex = this.obj_array.push(new Player(playerStartingPos)) - 1;
    
    //Initializing Internal Vars
    this.active = true;
    this.visible = true;
    this.drawFrame = 0;
    this.updateFrame = 0;
};
