var DIRECTIONS = {
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};

var Player = function (){
	//position
	this.currX = 0;
	this.currY = 0;
	this.x = 0;
	this.y = 0;
	
	//movement
	this.speed = 256;
	this.speedMod = 1;
	this.direction = DIRECTIONS.DOWN;
	
	//sprite things
	sprite = new Sprite();
	
};

Player.prototype.changeDirection = function(direction){
	//changes current direction
	if((direction > 3 || direction < 0) || direction == undefined){
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
			this.currY = this.Spr.Height;
			this.currX = this.Spr.Width;
			if(this.currX >= this.Spr.Width * 4){
				this.currX = 0;
			}
			break;
		case DIRECTIONS.DOWN:
			this.y += this.speed * this.speedMod;
			this.currY = 0;
			this.currX = this.Spr.Width;
			if(this.currX >= this.Spr.Width * 4){
				this.currX = 0;
			}
			break;
		case DIRECTIONS.LEFT:
			this.x -= this.speed * this.speedMod;
			this.currX = this.Spr.Width;
			if(this.currX >= this.Spr.Width * 7){
				this.currX = this.Spr.Width * 4
			}
			this.currY = 0;
			if(this.currX < this.Spr.Width * 4){
				this.currX = this.Spr.Width * 4;
			}
			break;
		case DIRECTIONS.RIGHT:
			this.x += this.speed * this.speedMod;
			this.currX = this.Spr.Width;
			if(this.currX >= this.Spr.Width * 7){
				this.currX = this.Spr.Width * 4)
			}
			this.currY = this.Spr.Height;
			if(this.currX < this.Spr.Width * 4){
				this.currX = this.Spr.Width * 4;
			}
			break;
	}
};

Player.prototype.draw = function(){
	context.drawImage(this.Sprite,
					  this.Spr.Width,
					  this.Spr.Height,
					  this.x,
					  this.y,
					  this.currX,
					  this.currY)
};

Player.prototype.update = function(){
	
};
