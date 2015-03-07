
var AXE_SPRITE     = new Sprite(50, 50, 50, 50);
var SPEAR_SPRITE   = new Sprite(50, 50, 50, 50);
var CHICKEN_SPRITE = new Sprite(50, 50, 50, 50);
var LOG_SPRITE     = new Sprite(50, 50, 50, 50);
var SEL_SPRITE     = new Sprite(50, 50, 50, 50);
var GUI_DRAW_OFFSET = 60;

function Item(type, sprite) {
	this.type = type;
	this.spr = sprite;
};


function GUI() {
	
	//Item fields
	
	//Store the index of the currently
	//selected item
	this.selected_item = 0;
	
	//store array of items the player
	//player 
	this.items = [];
	
	//store the hunger value of the 
	//XX TODO
	
	//need sprites for the GUI
	var chickenItem = new Item("chicken", CHICKEN_SPRITE);
	var damItem     = new Item("Dam", LOG_SPRITE);
	var axeItem     = new Item("axe", AXE_SPRITE);
	var spearItem   = new Item("spear", SPEAR_SPRITE);
	
	this.items.push(chickenItem);
	this.items.push(damItem);
	this.items.push(axeItem);
	this.items.push(spearItem);
};

GUI.prototype.nextItem = function() {
	if (this.selected_item == this.items.length - 1) {
		this.selected_item = 0;
	}
	else {
		this.selected_item += 1;
	}
};

GUI.prototype.prevItem = function() {
	if (this.selected_item == 0) {
		this.selected_item = this.items.length - 1;
	}
	else {
		this.selected_item -= 1;
	}
};

GUI.prototype.update = function(ifs){
	this.selected_item = ifs.obj_array[PlayerIndex].equipped;
};

GUI.prototype.draw = function(camera){
	var drawX = 50;
	var drawY = 50;
	
	for(var index = 0; index < this.items.length; ++index) {
		this.items[index].spr.draw(0, 0,
									drawX, drawY );
		
		if ( index == this.selected_item)
			SEL_SPRITE.draw(0, 0, drawX, drawY);
		
		drawY += GUI_DRAW_OFFSET;
		
		//console.log("Fudge");
	}
};



