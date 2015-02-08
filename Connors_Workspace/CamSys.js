//CamSys.js is a class designed to follow a player object and dictate what
//tiles should be generated

//Object Data Accumulation
var canvas = document.getElementById ( 'canvas' );
var context = canvas.getContext ( '2d' );

//camera object manipulation values
//change-able by mutation
var camera_speed = 0;
//----------------------Camera Initialization----------------------------//
function iniCam(camSpd) {
	camera_speed = camSpd;
}

//-----------------Camera Object and Support Functions-------------------//
//Camera Object encapsulates camera data
//such as position and scope
function Camera(x, y) {
	this.x = x;
	this.y = y;
	this.viewHeight = undefined;
	this.viewWidth = undefined;
}

function moveCamera(cam, x, y) {
	if (typeof cam != "Camera") {
		console.error("moveCamera : called with non-camera Object");
		return;
	}
	cam.x = x;
	cam.y = y;
}

function stepCameraX(cam) {
	if (typeof cam != "Camera") {
		console.error("moveCamera : called with non-camera Object");
		return;
	}	
	camera.x += camera_speed;
}

function stepCameraY(cam) {
	if (typeof cam != "Camera") {
		console.error("moveCamera : called with non-camera Object");
		return;
	}
	camera.y += camera_speed;
}

function mutCamHeight(cam, height) {
	if (typeof cam != "Camera") {
		console.error("moveCamera : called with non-camera Object");
		return;
	}
	cam.viewHeight = height;
}

function mutCamWidth(cam, width) {
	if (typeof cam != "Camera") {
		console.error("moveCamera : called with non-camera Object");
		return;
	}
	cam.viewWidth = width;
}

//----------------------Camera Draw Functions------------------------//
//camUpdate is a function that accepts a camera
//object and a set of objects in an array
function camUpdate(cam, objects) {
	//Need idea of object passing to reliably draw
	return;
}

function camDraw(cam, objects) {
	//this should scale objects by width and height
	//before drawing them to the frame.
	return;
}
