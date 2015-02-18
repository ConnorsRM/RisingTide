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
playerImage.src = "playersheetTrans.png";

var charWidth = 30;
var charHeight = 43;
var currX = 0;
var currY = 0;
var itemHeld = 0;


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
var lastKeyUp;

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    lastKeyUp = e.keyCode;
    delete keysDown[e.keyCode];
}, false);

var start = true;
// Reset the game when the player touches animal
var reset = function () {
    //keeps player in same position
    if (start) {
        player.x = canvas.width / 2;
        player.y = canvas.height / 2;
        start = false;
    }
    // animal appears randomly
    animal.x = 32 + (Math.random() * (canvas.width - 64));
    animal.y = 32 + (Math.random() * (canvas.height - 64));
};

// encapsulation function for movement - player.move(direction)
var move = function (direction) {

    if (direction === "up") {
        player.y -= player.speed * modifier;
        currY = charHeight;
        currX += charWidth;
        if (currX >= charWidth * 4) {
            currX = 0;
        }
    }
    if (direction === "down") {
        player.y += player.speed * modifier;
        currY = 0;
        currX += charWidth;
        if (currX >= charWidth * 4) {
            currX = 0;
        }
    }
    if (direction === "left") {
        currY = 0;
        if (currX < charWidth * 4) {
            currX = charWidth * 4;
        }
        player.x -= player.speed * modifier;
        currX += charWidth;
        if (currX >= charWidth * 7) {
            currX = charWidth * 4;
        }
    }
    if (direction === "right") {
        currY = charHeight;
        if (currX < charWidth * 4) {
            currX = charWidth * 4;
        }
        player.x += player.speed * modifier;
        currX += charWidth;
        if (currX >= charWidth * 7) {
            currX = charWidth * 4;
        }
    }


}

//this code will be removed, only for testing purposes
var update = function (modifier) {
    if (lastKeyUp == 32) { //space
        if (itemHeld != charHeight * 2) {
            itemHeld = charHeight * 2;
        }
        else
            itemHeld = 0;
    }

    if (lastKeyUp == 69) { //e
        if (itemHeld == charHeight * 2) {
            if (currX >= charWidth * 4)
                

            

                currX = charWidth * 9;
                for(i = 0;i<4;i++){
                    currX += charWidth;
                }
        }
    }

    if (38 in keysDown) { //up
        player.y -= player.speed * modifier;
        currY = itemHeld + charHeight;
        currX += charWidth;
        if (currX >= charWidth * 4) {
            currX = 0;
        }


    }
    if (40 in keysDown) { //down
        player.y += player.speed * modifier;
        currY = itemHeld;
        currX += charWidth;
        if (currX >= charWidth * 4) {
            currX = 0;
        }
    }
    if (37 in keysDown) { //left
        currY = itemHeld;
        if (currX < charWidth * 4) {
            currX = charWidth * 4;
        }
        player.x -= player.speed * modifier;

        currX += charWidth;
        if (currX >= charWidth * 7) {
            currX = charWidth * 4;
        }
    }
    if (39 in keysDown) { //right
        currY = itemHeld + charHeight;
        if (currX < charWidth * 4) {
            currX = charWidth * 4;
        }
        player.x += player.speed * modifier;
        currX += charWidth;
        if (currX >= charWidth * 7) {
            currX = charWidth * 4;
        }
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
    if (player.x >= canvas.width - charWidth) {
        player.x = canvas.width - charWidth;
    } else if (player.x <= 0) {
        player.x = 0;
    }
    if (player.y >= canvas.height - charHeight) {
        player.y = canvas.height - charHeight;
    } else if (player.y <= 0) {
        player.y = 0;
    }
};



// Draw
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (playerReady) {
        ctx.drawImage(playerImage, currX, currY, charWidth, charHeight, player.x, player.y, charWidth, charHeight);
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