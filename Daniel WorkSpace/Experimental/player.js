var DIRECTIONS = {
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};


var Player = function (pos){
	//position
	this.x = pos.x;
	this.y = pos.y;
	
	//movement
	this.speed = 6;
	this.speedMod = 1;
	this.direction = DIRECTIONS.DOWN;
	this.inputVars = [false, false, false, false];
	
	//Drowning
	this.drownCounter = 50;
	this.drownMax = 50;
	
	//sprite things
	this.spr = new Sprite();
	this.imageIndex = 0;
	this.animationIndex = 0;
	this.animationFreq = 3;
	this.animationCounter = 0;
};

Player.prototype.changeDirection = function(direction){
	//changes current direction
	if ((direction == undefined) || (direction > 3) || (direction < 0)) {
		console.error("Error: Player.changeDirection called with invalid direction");
		return;
	}
	this.direction = direction;
};


Player.prototype.draw = function(camera){
	this.spr.draw(this.animationIndex, this.imageIndex,
	this.x - this.spr.frameWidth / 2 - camera.x + DRAW_OFFSET_WIDTH, 
	this.y - this.spr.frameWidth / 2 - camera.y + DRAW_OFFSET_HEIGHT);
	
	//Manage Animation Indexing
	this.animationCounter++;
	if (this.animationCounter >= this.animationFreq) {
	    this.animationCounter = 0;

	imageIndex++;

    	if(this.imageIndex >= this.spr.maxFrames){
    		this.imageIndex = 0;
    	}
    }

};

Player.prototype.update = function(ifs){

    //Set Camera to this Position
    ifs.obj_array[CameraIndex].moveCamera(this.x + DRAW_OFFSET_WIDTH, this.y + DRAW_OFFSET_HEIGHT);
    
    //Check for input Settings (Set Animations Here)
    if (this.inputVars[DIRECTIONS.UP]) {
        this.y -= this.speed * this.speedMod;
    } 
    if (this.inputVars[DIRECTIONS.DOWN]) {
        this.y += this.speed * this.speedMod;
    }
    if (this.inputVars[DIRECTIONS.LEFT]) {
        this.x -= this.speed * this.speedMod;
    }
    if (this.inputVars[DIRECTIONS.RIGHT]) {
        this.x += this.speed * this.speedMod;
    }
    
    //Player Position Validation
    this.x = Math.min(Math.max(this.x, 0), WORLD_DIMENSION);
    this.y = Math.min(Math.max(this.y, 0), WORLD_DIMENSION);
    
    //Check For Drowning
    if (ifs.obj_array[IslandIndex].posToCell({x:this.x, y:this.y}).tile == 0) {
        --this.drownCounter;
        this.speedMod -= 1.0 / this.drownMax;
        if (this.drownCounter == 0) {
            this.spr = undefined;
        }
    } else {
        this.drownCounter = this.drownMax;
        this.speedMod = 1;
    }
    
};
