///////////////////////////////////////////////////////////////////////
//
// Entity.js
//
///////////////////////////////////////////////////////////////////////

//Some Entity Sprites
var TreeSprite = new Sprite(40, 80, 40, 80);

function Entity(tileSys, sprite, pos) {
    this.cell = tileSys.getCell(tileSys.posToCell(pos));
    this.x = null;
    this.y = null;
    this.spr = null;
    if (this.cell.entity == null) {
    	this.x = pos.x;
    	this.y = pos.y;
    	this.spr = sprite;
    	this.cell.entity = this; 
    }
};


Entity.prototype.load = function () {
    ImageLoader.loadImage(TreeSprite.image, "images/palmtree1.png");
};


Entity.prototype.remove = function() {
    this.spr = undefined;
    if (this.cell.entity != null) {
        this.cell.entity = null;
    }
    this.cell = null;
};


Entity.prototype.draw = function(camera) {
	if (this.spr == undefined) {
		return;
	}
	
	this.spr.draw(0, 0,
		this.x - this.spr.frameWidth / 2 - camera.x + camera.viewWidth, 
		this.y - this.spr.frameWidth / 2 - camera.y + camera.viewHeight);	
};


Entity.prototype.update = function() {
	//initially empty implementation,
	//override in individual types
};

