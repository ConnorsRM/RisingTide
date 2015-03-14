///////////////////////////////////////////////////////////////////////
//
// Entity.js
//
///////////////////////////////////////////////////////////////////////

//Some Entity Sprites
var TreeSprite  = new Sprite(60, 80, 60, 80);
var SQRL_SPRITE = new Sprite(30, 30, 30, 30);
var MAX_SQRL_COUNT = 20;
var Squirrel_Count = MAX_SQRL_COUNT;

function Entity(tileSys, sprite, pos) {
    var cell = tileSys.posToCell(pos);
	this.x = pos.x;
	this.y = pos.y;
	this.spr = sprite;
    cell.entity = this;
	this.center = {
	       x: this.spr.frameWidth / 2,
	       y: this.spr.frameHeight / 2
	 };
};


Entity.prototype.load = function () {
    ImageLoader.loadImage(TreeSprite.image, "images/palmtree1.png");
};


Entity.prototype.remove = function() {
    this.spr = null;
};


Entity.prototype.setCenter = function(x, y) {
    this.center.x = x;
    this.center.y = y;
};


Entity.prototype.remove = function() {
    this.spr = undefined;
    var cell = tileSys.posToCell(pos);
    if (cell.entity != false) {
        cell.entity = null;
    }
};


Entity.prototype.draw = function(camera) {
	if (this.spr == undefined) {
		return;
	}
	
	this.spr.draw(0, 0,
		this.x - this.center.x - camera.x + camera.viewWidth, 
		this.y - this.center.y - camera.y + camera.viewHeight);	
};


Entity.prototype.update = function() {
	//initially empty implementation,
	//override in individual types
};


var Tree = function (tileSys, pos) {
    Entity.call(this, tileSys, TreeSprite, pos);
    this.setCenter(this.center.x, this.spr.frameHeight);
    this.health = 5.0;
};
Tree.prototype = Object.create(Entity.prototype);


Tree.prototype.update = function(ifs) {
    //Simple creates a delay for health reduction so removal by
    //  axe happens closer to the end of an animation
    var floorHealth = Math.floor(this.health);
    if (this.health != floorHealth) {
        this.health -= 0.2;
        if (this.health < floorHealth)
            if (floorHealth > 0) {
                this.health = floorHealth;
                var i = Math.floor(SoundMap.ChopSize * Math.random());
                Sounds[SoundMap.Chop + i].play();
            } else {
                this.remove(true);
            }
    }
};


Tree.prototype.remove = function(playerDestroyed) {
    if (mainGame != undefined) {
        if (playerDestroyed) {
            ++mainGame.obj_array[PlayerIndex].logs;
            var i = Math.floor(SoundMap.ChopSize * Math.random());
            Sounds[SoundMap.Chop + i].play();
        }
        var id = mainGame.obj_array.indexOf(this);
        mainGame.obj_array.splice(id, 1);
        mainGame.obj_array[IslandIndex].posToCell({x:this.x, y:this.y}).entity = null;
    }
};

//
//SQRL - the mighty squirrel
//
function Sqrl(tileSys, pos) {
	var cell = tileSys.posToCell(pos);
	
	this.x = pos.x;
	this.y = pos.y;
	
	//TODO: add restruction to not spawn on water
	this.spr = SQRL_SPRITE;
	
	//store State for agent use
	this.state = State.WANDER;
	this.SENSE_DIST = 80; //2 tiles sense
	
	//store movement info
	this.dir = Direction.SOUTH;
	this.speed = 5;
	this.moveCount = 0;
	this.MAXMOVE = 20;
	this.lastMove = new Date().getTime();
	this.MOVEWAIT = 1000;
	
};


Sqrl.prototype.remove = function() {
    this.spr = null;
};


//enumeration for state
var State = {
	WANDER : 0,
	FLEE   : 1
};

var Direction = {
	NORTH : 0,
	SOUTH : 1,
	EAST  : 2,
	WEST  : 3
};

Sqrl.prototype.destroy = function(ifs) {

	//get index and remove from obj array
	var ifsIndex = ifs.obj_array.indexOf(this);
	ifs.obj_array.splice(ifsIndex, 1);
	//and sqrl array
	ifsIndex = ifs.sqrl_array.indexOf(this);
	ifs.sqrl_array.splice(ifsIndex, 1);
	--Squirrel_Count;
	
};

Sqrl.prototype.isSubmerged = function(ifs) {
	return ifs.obj_array[IslandIndex].posToCell({x:this.x,
													 y:this.y}).flooded;
};

Sqrl.prototype.update = function(ifs) {

	//if submerged, kill
	var ifsIndex = ifs.obj_array.indexOf(this);
	if(this.isSubmerged(ifs)) {
		this.destroy(ifs);
		return;
	}

	//sense and update state
	this.state = this.stateCheck(ifs);
	
	
	//Perform action based upon state.
	switch(this.state) {
		case State.WANDER:
			this.updateWander(ifs);
			break;
		case State.FLEE:
			this.updateFlee(ifs);
			break;
	}
	
};

Sqrl.prototype.stateCheck = function(ifs) {

	//obtain player position for check
	var pPos = {
		x: ifs.obj_array[PlayerIndex].x,
		y: ifs.obj_array[PlayerIndex].y
	};
	
	//shoot eucledian ray to target
	var rayMag = Math.sqrt(Math.pow(pPos.x-this.x,2) + Math.pow(pPos.y-this.y, 2));
	
	//if no player in range, WANDER
	//otherwise set FLEE
	if(rayMag < this.SENSE_DIST) {
		return State.FLEE;
	}
	
	return State.WANDER;
};

Sqrl.prototype.updateFlee = function(ifs) {
	//simple stuff
	//shoot ray to player, invert and move that way
	var pPos = {
		x: ifs.obj_array[PlayerIndex].x,
		y: ifs.obj_array[PlayerIndex].y
	};
	
	var rayX = this.x - pPos.x;
	var rayY = this.y - pPos.y;
	
	//normalize and invert ray
	var rayMag = Math.sqrt(Math.pow(rayX,2) + Math.pow(rayY, 2));
	rayX = (rayX / rayMag);
	rayY = (rayY / rayMag);
	
	//move
	var newPos = {x: this.x, y:this.y};
	newPos.x += rayX * this.speed;
	newPos.y += rayY * this.speed;
	
	//verify validity of new space and perform move
	var isValid = !(ifs.obj_array[IslandIndex].posToCell(newPos).flooded);
	
	if(isValid) {
		this.x = newPos.x;
		this.y = newPos.y;
	}
	
	//TODO: use count to pause for catching
	
};

Sqrl.prototype.updateWander = function(ifs) {
	//if it's time to pick a new direction
	if(this.moveCount >= this.MAXMOVE) {
		//determine direction
		this.dir = Math.floor((Math.random() * 4));
		this.moveCount = 0;
		this.lastMove = new Date().getTime();
	}
	
	//one second delay between moves
	var thisTime = new Date().getTime();
	if(thisTime - this.lastMove < this.MOVEWAIT) return;
	
	this.moveCount += 1;

	//move based on direction
	var newX = this.x;
	var newY = this.y;
	
	switch(this.dir) {
		case Direction.NORTH:
			newY -= this.speed;
			break;
		case Direction.SOUTH:
			newY += this.speed;
			break;
		case Direction.EAST:
			newX += this.speed;
			break;
		case Direction.WEST:
			newX -= this.speed;
			break;
	}
	
	//check new positions to ensure valid,
	//if invalid, don't do it
	var newPos = {x: newX, y: newY};
	var isValid = !(ifs.obj_array[IslandIndex].posToCell(newPos).flooded);
	
	if(isValid) {
		this.x = newPos.x;
		this.y = newPos.y;
	}
};

Sqrl.prototype.draw = function(camera) {
	//adjust
	if (this.spr == undefined) {
		return;
	}
	
	this.spr.draw(0, 0,
		this.x - (this.spr.frameWidth/2) - camera.x + camera.viewWidth, 
		this.y - (this.spr.frameHeight/2) - camera.y + camera.viewHeight);	
};

