//CamSys.js is a class designed to follow a player object and dictate what
//tiles should be generated

//Object Data Accumulation
var DRAW_OFFSET_WIDTH = 400;
var DRAW_OFFSET_HEIGHT = 400;
var CANVAS_DIMENSION = 800;

//World Dim is tile Width * num tiles
var WORLD_DIMENSION  = 4000;


//camera object manipulation values
//change-able by mutation

//----------------------Camera Initialization----------------------------//
Camera.prototype.iniCam = function(camSpd) {
	this.camera_speed = camSpd;
};

//-----------------Camera Object and Support Functions-------------------//
//Camera Object encapsulates camera data
//such as position and scope
function Camera(x, y) {
	this.x = x;
	this.y = y;
	this.viewHeight = Canvas.height;
	this.viewWidth = Canvas.height;
	this.camera_speed = 0;
}

Camera.prototype.moveCamera = function(x, y) {
	this.x = x;
	this.y = y;
};

Camera.prototype.stepForCameraX = function() {
	console.log(this.x);
	if (this.x + this.camera_speed < (WORLD_DIMENSION - DRAW_OFFSET_WIDTH))
		this.x += this.camera_speed;
};

Camera.prototype.stepForCameraY = function() {
	if(this.y + this.camera_speed < (WORLD_DIMENSION - DRAW_OFFSET_HEIGHT))
		this.y += this.camera_speed;
};

Camera.prototype.stepBackCameraX = function() {
	if(this.x - this.camera_speed > DRAW_OFFSET_WIDTH)
		this.x -= this.camera_speed;
}

Camera.prototype.stepBackCameraY = function() {
	if(this.y - this.camera_speed > DRAW_OFFSET_HEIGHT)
		this.y -= this.camera_speed
}

Camera.prototype.mutCamHeight = function(height) {
	this.viewHeight = height;
};

Camera.prototype.mutCamWidth = function(width) {
	this.viewWidth = width;
};

//----------------------Camera Draw Functions------------------------//

Camera.prototype.camDraw = function(ifs) {
	//this should scale objects by width and height
	//before drawing them to the frame.
	//tileSys.drawSection( {x:0,y:0}, {x:0, y:0}, {x:this.viewWidth, y:this.viewHeight} );
	
	//variables declared in this manner purely so others
	//may read
	
	//never draw something that isn't defined so set 0 as min
	var startX = Math.max(0, this.x - DRAW_OFFSET_WIDTH);
	var startY = Math.max(0, this.y - DRAW_OFFSET_HEIGHT);
	var endX = Math.min(WORLD_DIMENSION, startX + CANVAS_DIMENSION);
	var endY = Math.min(WORLD_DIMENSION, startY + CANVAS_DIMENSION);
	
	
	var startPos = {x:startX, y:startY};
	var endPos = {x:endX, y:endY};
	
	tileSys = ifs.obj_array[0];
	tileSys.drawSection({x:0, y:0}, startPos, endPos);
	
	for (var i = 1; i < ifs.obj_array.length; ++i) {
	    ifs.obj_array[i].draw();   //Needs a check to see if obj is even partially on screen
    }	
	
	//This is optional
	return;
};
