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

Player.prototype.move = function(){
	//movement of player
	switch(this.direction){
		case DIRECTIONS.UP:
			this.y -= this.speed * this.speedMod;
			this.currY = this.spr.Height;
			this.currX = this.spr.Width;
			if(this.currX >= this.spr.Width * 4){
				this.currX = 0;
			}
			break;
		case DIRECTIONS.DOWN:
			this.y += this.speed * this.speedMod;
			this.currY = 0;
			this.currX = this.spr.Width;
			if(this.currX >= this.spr.Width * 4){
				this.currX = 0;
			}
			break;
		case DIRECTIONS.LEFT:
			this.x -= this.speed * this.speedMod;
			this.currX = this.spr.Width;
			if(this.currX >= this.spr.Width * 7){
				this.currX = this.spr.Width * 4;
			}
			this.currY = 0;
			if(this.currX < this.spr.Width * 4){
				this.currX = this.spr.Width * 4;
			}
			break;
		case DIRECTIONS.RIGHT:
			this.x += this.speed * this.speedMod;
			this.currX = this.spr.Width;
			if(this.currX >= this.spr.Width * 7){
				this.currX = this.spr.Width * 4;
			}
			this.currY = this.spr.Height;
			if(this.currX < this.spr.Width * 4){
				this.currX = this.spr.Width * 4;
			}
			break;
	}
};

Player.prototype.draw = function(ifs){
	this.spr.draw(this.animationIndex, this.imageIndex,
	this.x - this.spr.frameWidth / 2, this.y - this.spr.frameWidth / 2);
	
	//Manage Animation Indexing
	this.animationCounter++;
	if (this.animationCounter >= this.animationFreq) {
	    this.animationCounter = 0;
	    
        this.imageIndex++;
    	if(this.imageIndex >= this.spr.maxFrames){
    		this.imageIndex = 0;
    	}
    }

};

Player.prototype.update = function(ifs){
    
    //Check For Drowning
    if (ifs.obj_array[IslandIndex].posToCell({x:this.x, y:this.y}).tile == 0) {
        --this.drownCounter;
        if (this.drownCounter == 0) {
            this.spr = undefined;
        }
    } else {
        this.drownCounter = this.drownMax;
    }
    
};
