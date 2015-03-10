var Hunger = function(x, y){
	//allows the hunger bar to be placed anywhere
	//given stats for the hunger is 100/100 at starting point
	this.x = x;
	this.y = y;
	this.width = 100;
	this.height = 10;
	this.hungry = 100;
	this.maxHungry = 100;
};

Hunger.prototype.remove = function() {
    
};


Hunger.prototype.draw = function(camera){
	//function that will show the text and bars for hunger
	var percent = (this.hungry * 1.0)/(this.maxHungry * 1.0);

	//The text of hunger
	Context.fillStyle = "Black";
	Context.font = "18px sans-serif";
	Context.fillText("Hunger:", 20, 20);
		
	//background of the hunger bar
	Context.fillStyle = "Black";
	Context.fillRect(this.x, this.y, this.width, this.height);
	
	//part of the hunger bar that will decrease/increase over time
	Context.fillStyle = "Red";
	Context.fillRect(this.x, this.y, (this.width*percent), this.height);
};

Hunger.prototype.update = function(ifs){
	//checking hunger status to determine the bar length
	
	/*
	 if(this.animationIndex = PlayerAnims.eatFood){
		this.hunger += 10;
	}
	*/
	
	if(this.hungry <= 0){
		//if player's health reaches 0, he dead
		this.hungry = 0;
		ifs.obj_array[PlayerIndex].die();
	}else if(this.hungry >= 101){
		//stops player's health from going over the bar
		this.hungry = 100;
		this.displayHunger();
	}else{
		//slowly depletes the health bar
		this.hungry -= 0.03;
		this.percent = this.hungry/this.maxHungry;
		//this.displayHunger();
	}
};
