var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

var DIRECTIONS = {
	UP : 0,
	DOWN : 1,
	LEFT : 2,
	RIGHT : 3
};

var Player = function() {
	
	//initialize playerImage
	this.playerImage = new Image();
	
	this.playerImage.src = "playersheet.png";

	
	//initialize dimensions
	this.CHAR_WIDTH  = 30;
	this.CHAR_HEIGHT = 43;
	
	//position properties
	this.currX       = 0;
	this.currY       = 0;
	//yum, I could go for curry
	this.x			 = 0;
	this.y			 = 0;
	
	//player movement properties
	this.speed = 256;
	this.speedMod = 1;
	this.direction = DIRECTIONS.DOWN;
};

//mutation

//changeDirection changes the current direction
//provided an integer mapping to DIRECTIONS above
Player.prototype.changeDirection = function(direction) {
	if((direction > 3 || direction < 0) || direction == undefined) {
		console.error("Error : Player.changeDirection called with invalid direction");
		return;
	}
	
	this.direction = direction;
};

Player.prototype.move = function() {
	switch(this.direction) {
		case DIRECTIONS.UP:
			this.y -= this.speed * this.speedMod;
			this.currY = this.CHAR_HEIGHT;
			this.currX += this.CHAR_WIDTH;
        	if (this.currX >= this.CHAR_WIDTH * 4) {
            	this.currX = 0;
        	}
        	break;
        	
        case DIRECTIONS.DOWN:
        	this.y += this.speed * this.speedMod;
        	this.currY = 0;
        	this.currX += this.CHAR_WIDTH;
        	if (this.currX >= this.CHAR_WIDTH * 4) {
            	this.currX = 0;
        	}
        	break;
        	
        case DIRECTIONS.LEFT:
        	this.currY = 0;
        	if (this.currX < this.CHAR_WIDTH * 4) {
            	this.currX = this.CHAR_WIDTH * 4;
        	}
        	this.x -= this.speed * this.speedMod;
        	this.currX += this.CHAR_WIDTH;
         	if (this.currX >= this.CHAR_WIDTH * 7) {
            	this.currX = this.CHAR_WIDTH * 4;
        	}
        	break;
        
        case DIRECTIONS.RIGHT:
        	this.currY = this.CHAR_HEIGHT;
        	if(this.currX < this.CHAR_WIDTH * 4) {
        		this.currX = this.CHAR_WIDTH * 4;
        	}
        	this.x += this.speed * this.speedMod;
        	this.currX += this.CHAR_WIDTH;
        	if(this.currX >= this.CHAR_WIDTH * 7) {
        		this.currX = this.CHAR_WIDTH * 4;
        	}
        	break;     	        	        	
	}
};

Player.prototype.draw = function() {
	 
	 context.drawImage(this.playerImage,
	 				   this.currX,
	 				   this.currY,
	 				   this.CHAR_WIDTH,
	 				   this.CHAR_HEIGHT,
	 				   this.x,
	 				   this.y,
	 				   this.CHAR_WIDTH,
	 				   this.CHAR_HEIGHT);
	 
};

