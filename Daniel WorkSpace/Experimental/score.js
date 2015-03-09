var score = function(){
	this.score = 0; //current score
	this.maxScore = 0; //saved maximum score
};

score.prototype.displayScore= function(timeAlive,damsMade,timeDrowning,timeHungry){
	//adds up and displays the score after the game ends
        this.score += timeAlive/250;
        this.score += damsMade;
        this.score -= timeDrowning/100;
        this.score -= timeHungry/100; //timeHungry must be added to player once hunger is implemented fully
	Context.fillStyle = "Red";
	Context.font = "30px Arial";
        Context.textAlign = "center";
	Context.fillText(this.score, Canvas.width/2, Canvas.height/2);

};


