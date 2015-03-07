///////////////////////////////////////////////////////////////////////
//
// Entity.js
//
///////////////////////////////////////////////////////////////////////

//Some Entity Sprites
var TreeSprite = new Sprite(60, 80, 60, 80);

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
