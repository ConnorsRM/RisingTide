//CamSys.js is a class designed to follow a player object and dictate what
//tiles should be generated

//Object Data Accumulation
var DRAW_OFFSET_WIDTH = 150;
var DRAW_OFFSET_HEIGHT = 150;
var CANVAS_DIMENSION = 300;

//camera object manipulation values
//change-able by mutation
var camera_speed = 0;
//----------------------Camera Initialization----------------------------//
Camera.prototype.iniCam = function(camSpd) {
	camera_speed = camSpd;
};

//-----------------Camera Object and Support Functions-------------------//
//Camera Object encapsulates camera data
//such as position and scope
function Camera(x, y, canvas_width, canvas_height) {
	this.x = x;
	this.y = y;
	this.viewHeight = canvas_height;
	this.viewWidth = canvas_width;
}

Camera.prototype.moveCamera = function(x, y) {
	this.x = x;
	this.y = y;
};

Camera.prototype.stepCameraX = function() {
	this.x += camera_speed;
};

Camera.prototype.stepCameraY = function() {
	this.y += camera_speed;
};

Camera.prototype.mutCamHeight = function(height) {
	this.viewHeight = height;
};

Camera.prototype.mutCamWidth = function(width) {
	this.viewWidth = width;
};

//----------------------Camera Draw Functions------------------------//

Camera.prototype.camDraw = function(tileSys, player) {
	//this should scale objects by width and height
	//before drawing them to the frame.
	//tileSys.drawSection( {x:0,y:0}, {x:0, y:0}, {x:this.viewWidth, y:this.viewHeight} );
	
	//variables declared in this manner purely so others
	//may read
	
	//never draw something that isn't defined so set 0 as min
	var startX = Math.max(0, this.x - DRAW_OFFSET_WIDTH);
	var startY = Math.max(0, this.y - DRAW_OFFSET_HEIGHT);
	var endX = startX + CANVAS_DIMENSION;
	var endY = startY + CANVAS_DIMENSION;
	
	var startPos = {x:startX, y:startY};
	var endPos = {x:endX, y:endY};
	
	tileSys.drawSection({x:0, y:0}, startPos, endPos);
	
	//now draw player
	player.draw();
	
	//This is optional
	return;
};
