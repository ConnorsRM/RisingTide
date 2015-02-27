
/*
imageWidth/Height - width and height of the image itself (spritesheet)
frameWidth/Height - width and height of a single frame of animation
framesPerRow - caluculates the frames per row via imageWidth/frameWidth
Animations - an array of arrays. each element is an set of animation frames
 */

function Sprite(imageWidth,imageHeight,frameWidth, frameHeight) {
    this.image = new Image();
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.framesPerRow = Math.floor(this.imageWidth/this.frameWidth); //used if sprite is a spritesheet
    this.Animations = [];
}



/**
 * Creates an animation from a spritesheet.
 * @param {number}      - Number of frames to wait for before transitioning the animation.
 * @param {array}       - Range or sequence of frame numbers for the animation.
 * @param {boolean}     - Repeat the animation once completed.
 */
Sprite.prototype.loadAnimation = function (startFrame, endFrame) {

    var animationSequence = [];  // array holding the order of the animation

    // start and end range for frames
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++) {
        animationSequence.push(frameNumber);
    }
    return this.Animations.push(animationSequence)-1; //add the animation to the animations array somone figure out why this has to be "-1"
}

/**
 * Draw the current frame
 * @param {integer} x - X position to draw
 * @param {integer} y - Y position to draw
 */
Sprite.prototype.draw = function (animIndex,animFrame,x, y) {
    // get the row and col of the frame
    
    var row = Math.floor(this.Animations[animIndex][animFrame] / this.framesPerRow);
    var col = Math.floor(this.Animations[animIndex][animFrame] % this.framesPerRow);


    Context.drawImage(
            this.image,
            col * this.frameWidth, row * this.frameHeight,
            this.frameWidth, this.frameHeight,
            x, y,
            this.frameWidth, this.frameHeight);
};







