var score = function () {
    this.score = 0; //current score
    this.maxScore = 0; //saved maximum score
    this.index = 1; //used for counting score in relation to journal pages
};

score.prototype.displayScore = function () {
    //adds up and displays the score after the game ends

    Context.font = "bold 30pt Arial";//"30pt Arial";
    Context.fillStyle = 'red';
    Context.textAlign = "center";
    Context.fillText("GAME OVER", Canvas.width / 2, Canvas.height / 2);
    Context.fillText("SCORE : " + this.score.toFixed(0).toString(), Canvas.width / 2, Canvas.height / 2 + 50);
    Context.textAlign = "start";

};
//updates the score to keep it correct
score.prototype.update = function (score) {
//if score is high enough display journal
    this.score = score;
    console.log(score);

    if (score > this.index * 100) {
        this.index++;
        sPause = true;
        mainGame.deactivate();
        var i = Math.floor(SoundMap.PageSize * Math.random());
        Sounds[SoundMap.Page + i].play();
        entryNum++


    }





}


