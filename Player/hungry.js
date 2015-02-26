// canvas properties
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

var bar = {
    x: 20,
    y: 30,
    width: 100,
    height: 10
};

var hunger = 100;
var maxHunger = 100;


// Loop
setInterval(onTimerTick, 33);

function displayHunger(){
	
	context.fillStyle = "Black";
    context.font = "18px sans-serif";
    context.fillText("Hunger", 20, 20);

    context.fillStyle = "black";
    context.fillRect(bar.x, bar.y, bar.width, bar.height);

    context.fillStyle = "red";
    context.fillRect(bar.x, bar.y, bar.width * percent, bar.height);
}

function dead(){
	
	context.fillStyle = "Blue";
	context.font = "30px sans-serif";
	context.fillText("Game Over", 200, 50);
}

//keysdown is just to test if the bar would go down/up
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Render Loop
function onTimerTick() {

    // Clear the canvas
    canvas.width = canvas.width;
    
    if(38 in keysDown){
    	hunger -= 10;
    }
    if(40 in keysDown){
    	hunger += 10;
    }

	//displayHunger();
	
	if(hunger <= 0){
        hunger = 0;
		dead();
    }else if(hunger >= 101){
    	hunger = 100;
    	displayHunger();
      }else{
        hunger -= 0.05;
        percent = hunger/maxHunger;
        displayHunger();
    }
    
}