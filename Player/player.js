// Canvas info
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

// Background img
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "http://media.tumblr.com/c4a7d0a764cbf1e166121cbb54dc8768/tumblr_inline_mr7u3fm7e81qz4rgp.gif";

// Player img
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
	playerReady = true;
};
playerImage.src = "http://media.tumblr.com/2ef84d9755cc02d1c864c28cc4a1b315/tumblr_inline_njfty1W25B1t3ppxd.png";

// Animal img
var animalReady = false;
var animalImage = new Image();
animalImage.onload = function () {
	animalReady = true;
};
animalImage.src = "http://sprites.pokecheck.org/i/495.gif";

var playerLeftImage = new Image();
playerLeftImage = "http://www.pokestadium.com/assets/img/sprites/trainers/1/redblue/39.png";

// Game objects
var player = {
	speed: 256 // movement
};
var animal = {};
var animalsCaught = 0;

// keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var start = true;
// Reset the game when the player touches animal
var reset = function () {
	//keeps player in same position
	if(start){
	player.x = canvas.width / 2;
	player.y = canvas.height / 2;
	start = false;
	}
	// animal appears randomly
	animal.x = 32 + (Math.random() * (canvas.width - 64));
	animal.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { 
		player.y -= player.speed * modifier;
	}
	if (40 in keysDown) { 
		player.y += player.speed * modifier;
	}
	if (37 in keysDown) { 
		player.x -= player.speed * modifier;
	}
	if (39 in keysDown) { 
		player.x += player.speed * modifier;
	}

	// check collision
	if (
		player.x <= (animal.x + 32)
		&& animal.x <= (player.x + 32)
		&& player.y <= (animal.y + 32)
		&& animal.y <= (player.y + 32)
	) {
		reset();
	}
	//keep player within canvas
    if (player.x >= canvas.width - playerImage.width) {
		player.x = canvas.width - playerImage.width;
	} else if (player.x <= 0) {
		player.x = 0;
	}
	if (player.y >= canvas.height - playerImage.height) {
		player.y = canvas.height - playerImage.height;
	}else if (player.y <= 0) {
		player.y = 0;
	}
};

// Draw
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (playerReady) {
		ctx.drawImage(playerImage, player.x, player.y);
	}

	if (animalReady) {
		ctx.drawImage(animalImage, animal.x, animal.y);
	}
};

//game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};


var then = Date.now();
reset();
main();