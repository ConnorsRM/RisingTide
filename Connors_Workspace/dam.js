var TILE_WIDTH = 40;
var DAM_SPRITE = new Sprite(100, 100, 100, 100 )

function Dam(pos, tileEng) {
	this.x = pos.x;
	this.y = pos.y;
	
	this.spr      = DAM_SPRITE;
	this.imageIndex = 0;
	this.animationIndex = 0;
	this.animationFreq = 1;
	this.animationCounter = 0;
	
	//load image
	//create ler;
	tempLoader.loadImage(this.sprite.image, "dam.png")
	
	//determine Position
	var tileX = Math.floor(xpos/TILE_WIDTH);
	var tileY = Math.floor(ypos/TILE_WIDTH);
	this.tilePos = {x:tileX, y:tileY};
	
	//load image
	ImageLoader.loadImage(DAM_SPRITE.image, "images/dam.png");
	
	//augment tile elevation
	tileEng.getCell(tilePos).elevation += 1;
	
	
}

Dam.prototype.update = function(inface){
	//this will degrade dam later.
	
}

Dam.prototype.draw = function(inface) {
	Context.drawImage(this.sprite.image, this.position.x, this.position.y, TILE_WIDTH, TILE_WIDTH);
}
