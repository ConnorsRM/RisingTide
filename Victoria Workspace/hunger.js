var Hunger = function(x, y){
	this.x = x;
	this.y = y;
	this.width = 100;
	this.height = 10;
	this.hungry = 100;
	this.maxHungry = 100;
};

Hunger.prototype.displayHunger = function(){
	//bars for hunger
	Context.fillStyle = "Black";
	Context.font = "18px sans-serif");
	Context.fillText("Hunger", 20, 20);
	
	Context.fillStyle = "Black";
	Context.fillRect(this.x, this.y, this.width, this.height);
	
	Context.fillStyle = "Red";
	Context.fillRect(this.x, this.y, this.width*percent, this.height);
};

Hunger.prototype.update = function(){
	//checking hunger status
	if(this.hungry <= 0){
		this.hungry = 0;
		//end game status
	}else if(this.hungry >= 101){
		this.hungry = 100;
		this.displayHungry();
	}else{
		this.hungry -= 0.05;
		this.percent = this.hungry/this.maxHungry;
		this.displayHungry();
	}
};
