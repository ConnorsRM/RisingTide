/*
 * GUI.js yadda yadda
 */

var AXE_SPRITE     = new Sprite(80, 80, 80, 80);
var SPEAR_SPRITE   = new Sprite(80, 80, 80, 80);
var CHICKEN_SPRITE = new Sprite(80, 80, 80, 80);

function Item(type, sprite) {
	this.type = type;
	this.spr = sprite;
}


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
	var axeItem     = new Item("axe", AXE_SPRITE);
	var spearItem   = new Item("spear", SPEAR_SPRITE);
	var chickenItem = new Item("chicken", CHICKEN_SPRITE);
	
	this.items.push(axeItem);
	this.items.push(spearItem);
	this.items.push(chickenItem);
};

GUI.prototype.update = function(ifs){
	
};

GUI.prototype.draw = function(camera){
	for (var thisItem : this.items)
};



