var TILE_WIDTH = 40;

function Dam(xpos, ypos, tileEng) {
	this.position = {x:xpos, y:ypos};
	this.sprite = new Sprite(100, 100, 100, 100);
	this.tilePos = undefined;
	
	//load image
	//create ler
	var tempLoader = imgLoader(function(){});
	tempLoader.loadImage(this.sprite.image, "dam.png")
	
	//determine Position
	var tileX = Math.floor(xpos/TILE_WIDTH);
	var tileY = Math.floor(ypos/TILE_WIDTH);
	
	this.tilePos = {x:tileX, y:tileY};
	
	tileEng.getCell(tilePos).elevation += 1;
}

Dam.prototype.update = function(inface){
	//this will degrade dam later.
	
}

Dam.prototype.draw = function(inface) {
	Context.drawImage(this.sprite.image, this.position.x, this.position.y, TILE_WIDTH, TILE_WIDTH);
}
