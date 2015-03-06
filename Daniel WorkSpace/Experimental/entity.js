///////////////////////////////////////////////////////////////////////
//
// Entity.js
//
///////////////////////////////////////////////////////////////////////

//Some Entity Sprites
var TreeSprite = new Sprite(60, 80, 60, 80);

function Entity(tileSys, sprite, pos) {
    this.cell = tileSys.getCell(tileSys.posToCell(pos));
    this.x = null;
    this.y = null;
    this.spr = null;
    this.center = null;
    if (this.cell.entity == null) {
    	this.x = pos.x;
    	this.y = pos.y;
    	this.spr = sprite;
    	this.cell.entity = this;
    	this.center = {
    	       x: this.spr.frameWidth / 2,
    	       y: this.spr.frameHeight / 2
    	 };
    }
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
};
Tree.prototype = Object.create(Entity.prototype);
