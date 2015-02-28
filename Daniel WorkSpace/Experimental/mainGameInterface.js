//Interface Set Up for the main Game

var mainGame = new Interface();

//Stores PlayerIndex
var CameraIndex;
var IslandIndex;
var PlayerIndex;

mainGame.init = function() {
    this.id = InterfaceStack.push(this);
    
    SeaLevelRise = 0.01;
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
        if ((e.keyCode == 87) && (status)) {
            this.obj_array[PlayerIndex].changeDirection(DIRECTIONS.UP);
            this.obj_array[PlayerIndex].move();
        } 
        if ((e.keyCode == 83) && (status)) {
            this.obj_array[PlayerIndex].changeDirection(DIRECTIONS.DOWN);
            this.obj_array[PlayerIndex].move();
        } 
        if ((e.keyCode == 65) && (status)) {
            this.obj_array[PlayerIndex].changeDirection(DIRECTIONS.LEFT);
            this.obj_array[PlayerIndex].move();
        } 
        if ((e.keyCode == 68) && (status)) {
            this.obj_array[PlayerIndex].changeDirection(DIRECTIONS.RIGHT);
            this.obj_array[PlayerIndex].move();
        }
    };
};
