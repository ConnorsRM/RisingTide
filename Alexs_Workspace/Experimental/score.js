var Score = function(){
	this.score = 0; //current score
	this.maxScore = 0; //saved maximum score
};

Score.prototype.displayScore = function(){
	//adds up and displays the score after the game ends
        this.score += player.timeAlive/250;
        this.score += player.damsMade;
        this.score -= player.timeDrowning/100;
        this.score -= player.timeHungry/100; //timeHungry must be added to player once hunger is implemented fully
	Context.fillStyle = "Red";
	Context.font = "30px Arial";
        Context.textAlign = "center";
	Context.fillText(this.score, Canvas.width/2, Canvas.height/2);

};


