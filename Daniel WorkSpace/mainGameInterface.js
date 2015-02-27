//Interface Set Up for the main Game

var mainGame = new Interface();

//Stores PlayerIndex
var Camera;
var PlayerIndex = 1;

mainGame.init = function() {
    this.id = InterfaceStack.push(this);
    
    this
    this.obj_array.push(new Player);
};