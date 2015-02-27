// Daniel Luna
//-----------------------------------------------------
// Game Creation and Update
//-----------------------------------------------------

//All variables of global scope are capitalized

//Global Game Variables
var Canvas;
var Context;
var FramesPerSecond;

//Image Loader
var ImageLoader;
//Images to Load Go Here:


function gameLoad() {
    //All loading of game resources should be done in this function
    //  which should be called before all other functions.
    
    //Get the Canvas and the Context
    Canvas = document.getElementById('canvas');
    Context = Canvas.getContext('2d');
    
    //Set Up The Initial Interface
    mainGame.init();
    
    //Set up imageLoader
    ImageLoader = new imgLoader();
};


function gameInit() {
    //This function should be called to reset the game to it's initial
    //  status.
    
    //Starts Game Loop
    setInterval(update, 1000 / FramesPerSecond);
};


function update() {
    //This function is called every game step. It steps through
    //  all of the objects in obj_array and calls their update 
    //  function.
    for (var i = 0; i < InterfaceStack.length; ++i) {
        InterfaceStack[i].update();
    }
    
    draw();
}; 


function draw() {
    //This function is called every game step. It steps through
    //  all of the objects in obj_array and calls their draw function.
    
    for (var i = 0; i < InterfaceStack.length; ++i) {
        InterfaceStack[i].draw();
    }
};

