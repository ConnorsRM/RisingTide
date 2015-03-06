var TILE_WIDTH = 40;
var DAM_SPRITE = new Sprite(40, 40, 40, 40);

function Dam(pos) {

	this.x = pos.x;
	this.y = pos.y;
	this.ifsIndex = undefined;
	this.elevation = undefined;
	this.spr = DAM_SPRITE;
	
};

Dam.prototype.destroy = function(ifs){
	ifs.obj_array.splice(this.ifsIndex, 1);
}

Dam.prototype.update = function(ifs){
	this.ifsIndex = ifs.obj_array.indexOf(this);
	if(ifs.obj_array[IslandIndex].sea_level > this.elevation ) {
		this.destroy(ifs);
	}
};

Dam.prototype.draw = function(camera) {
	this.spr.draw(0, 0,
	this.x - camera.x + camera.viewWidth, 
	this.y - camera.y + camera.viewHeight);
};
