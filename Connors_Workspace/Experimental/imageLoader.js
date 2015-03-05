// Daniel Luna
//-----------------------------------------------------
// Simple Image Loader
//-----------------------------------------------------

//A simple object designed to take care of loading images
//  for the game and then call a function once ready.


var imgLoader = function(afterDoneCall) {
    this.imagesLoaded = 0;
    this.imagesToLoad = 0;
    this.allLoadingQueued = false;
    this.functionToCall = afterDoneCall;
};


imgLoader.prototype.loadImage = function(img, source) {
    //Call this to tell the imgLoader it is responsible for
    //  loading the source into the Image img. Does nothing
    //  if you've already called callWhenReady
    if (!(this.allLoadingQueued)) {
        ++this.imagesToLoad;
        img.src = source;
        img.onload = loadedImagesTest;
    }
};


imgLoader.prototype.callWhenReady = function() {
    //Call this function after giving this obj all of the 
    //  images you want it to load so it knows it is okay 
    //  to call the function. Should be put after *all* 
    //  gameLoad operations are complete so as not to cause
    //  a premature game.
    this.allLoadingQueued = true;
};


function loadedImagesTest() {
    //This function is called every time an image is loaded
    //  so we can detect if we are done.
    console.log("loadedTest();");
    ++ImageLoader.imagesLoaded;
    console.log(ImageLoader.imagesLoaded);
    if ((ImageLoader.imagesLoaded == ImageLoader.imagesToLoad) && (ImageLoader.allLoadingQueued)) {
        ImageLoader.functionToCall();
    }
};

