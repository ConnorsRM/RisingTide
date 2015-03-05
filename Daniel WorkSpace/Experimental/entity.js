function Entity(pos) {
	this.x = pos.x;
	this.y = pos.y;
	this.spr = undefined;
	this.speed = undefined;
}

Entity.prototype.draw = function(camera) {
	if (this.spr == undefined) {
		return;
	}
	
	this.spr.draw(this.animationIndex, this.imageIndex,
		this.x - this.spr.frameWidth / 2 - camera.x + camera.viewWidth, 
		this.y - this.spr.frameWidth / 2 - camera.y + camera.viewHeight);	
}

Entity.prototype.update = function() {
	//initially empty implementation,
	//override in individual types
}

