
/*
imageWidth/Height - width and height of the image itself (spritesheet)
frameWidth/Height - width and height of a single frame of animation
framesPerRow - caluculates the frames per row via imageWidth/frameWidth
Animations - an array of arrays. each element is an set of animation frames
 */

function Sprite(imageWidth, imageHeight, frameWidth, frameHeight) {
    this.image = new Image();
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.framesPerRow = Math.floor(this.imageWidth/this.frameWidth); //used if sprite is a spritesheet
    this.Animations = [];
    this.maxFrames = 0;
}



/**
Creates an animation for the sprite starting from startFrame and ending at endFrame
startFrame - the starting frame in the spritesheet
endFrame - the ending frame in the spritesheet
 */
Sprite.prototype.loadAnimation = function (startFrame, endFrame) {

    var animationSequence = [];  // array holding the order of the animation

    // start and end range for frames
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++) {
        animationSequence.push(frameNumber);
    }
    return this.Animations.push(animationSequence)-1; //add the animation to the animations array
};

/**
 * Draw the animFrame of the requested animation (animIndex)
 animIndex - the animation to draw
 animFrame - the frame of the animation to draw
 x - X position to draw
 y - Y position to draw
 */
Sprite.prototype.draw = function (animIndex,animFrame,x, y) {
	//if no animations are definied, just draw
	if(this.Animations.length == 0) {
		Context.drawImage(this.image,
						  x,
						  y,
						  this.frameWidth,
						  this.frameHeight);
		return;
	}


    // get the row and col of the frame via the framesPerRow and Animations index.
    this.maxFrames = this.Animations[animIndex].length;
    
    var row = Math.floor(this.Animations[animIndex][animFrame] / this.framesPerRow);
    var col = Math.floor(this.Animations[animIndex][animFrame] % this.framesPerRow);


    Context.drawImage( //draws the frame of the animation
            this.image,
            col * this.frameWidth, row * this.frameHeight,
            this.frameWidth, this.frameHeight,
            x, y,
            this.frameWidth, this.frameHeight);
            
};
