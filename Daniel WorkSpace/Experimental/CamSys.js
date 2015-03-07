//CamSys.js is a class designed to follow a player object and dictate what
//tiles should be generated

//Object Data Accumulation
var DRAW_OFFSET_WIDTH = 400;
var DRAW_OFFSET_HEIGHT = 300;
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
function Camera(pos) {
	this.x = pos.x;
	this.y = pos.y;
	this.viewHeight = DRAW_OFFSET_HEIGHT;
	this.viewWidth = DRAW_OFFSET_WIDTH;
	this.camera_speed = 0;
}

Camera.prototype.moveCamera = function(x, y) {
	if((x - DRAW_OFFSET_WIDTH) < DRAW_OFFSET_WIDTH)
		this.x = DRAW_OFFSET_WIDTH;
	else if(x > WORLD_DIMENSION){} //this empty clause will be removed when I have more time to edit, it's a byproduct of the debug
	else
		this.x = x - DRAW_OFFSET_WIDTH;

	if((y - DRAW_OFFSET_HEIGHT) < DRAW_OFFSET_HEIGHT)
		this.y = DRAW_OFFSET_HEIGHT;
	else if(y > WORLD_DIMENSION) {}
	else
		this.y = y - DRAW_OFFSET_HEIGHT;
};

Camera.prototype.stepForCameraX = function() {
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
};

Camera.prototype.stepBackCameraY = function() {
	if(this.y - this.camera_speed > DRAW_OFFSET_HEIGHT)
		this.y -= this.camera_speed;
};

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
	var endX = Math.min(WORLD_DIMENSION -40, startX + CANVAS_DIMENSION);
	var endY = Math.min(WORLD_DIMENSION -40, startY + CANVAS_DIMENSION);
	
	var startPos = {x:startX, y:startY};
	var endPos = {x:endX, y:endY};
	
	ifs.obj_array[IslandIndex].drawSection({x:0, y:0}, startPos, endPos);
	
	//copy what we'll be drawing, it's shallow
	var sortObj_array = ifs.obj_array.slice(3);
	//var test = ifs.obj_array;

	//sort drawn array of objects by checking the depth of each object
	sortObj_array.sort(function(a, b){
		
		//this should never be encountered,
		//but if it is, assume equal plain
		if(a.x == undefined || b.x == undefined)
			return 0;
		
		return (a.y - b.y);
		
		
	});
			
	
	for(var i = 0; i < sortObj_array.length; ++i) {
		sortObj_array[i].draw(this);
	}
	//sort by depth;

	
	
};

