var score = function(){
	this.score = 0; //current score
	this.maxScore = 0; //saved maximum score
};

score.prototype.displayScore= function(timeAlive,damsMade,timeDrowning){
	//adds up and displays the score after the game ends
        this.score += timeAlive;
        this.score += damsMade;
        this.score -= timeDrowning/100;
	
	Context.font = "bold 30pt Arial";//"30pt Arial";
	Context.fillStyle = 'red';
    Context.textAlign = "center";
	Context.fillText("GAME OVER", Canvas.width/2, Canvas.height/2);
	Context.fillText("SCORE : " + this.score.toFixed(0).toString(), Canvas.width/2, Canvas.height/2 + 50);
	Context.textAlign = "start";
	
};


