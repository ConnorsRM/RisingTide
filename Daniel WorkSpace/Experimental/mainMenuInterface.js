//Main Menu set up for Game

var mainMenu = new Interface();
var MenuBackground = new Image();

mainMenu.init = function() {
    //Initializing Internal Vars
    this.id = InterfaceStack.push(this);
    this.active = true;
    this.visible = true;
    this.drawFrame = 0;
    this.updateFrame = 0;
    
    
    this.obj_array.push(new Menu());
    //Input Definitions
    this.inputHandler = function(e, status) {
        if ((e.keyCode == 13) && !status && this.active) {  //Enter
            mainGame.init();
            this.visible = false;
        } else if ((e.keyCode == 84) && !status) { //T
            this.active = !this.active;
        } else if (!this.active) {
             thist.active = true;
        }
    };
};


var Menu = function() {};


Menu.prototype.update = function() {
    
};


Menu.prototype.draw = function() {
    //Draw Background
    Context.drawImage(MenuBackground, 0, 0, 800, 600);
    
    //The text Buttons
    Context.textAlign = "center";
    Context.fillStyle = "Green";
    Context.font = "32px sans-serif";
    Context.fillText("Play Game: Enter", 400, 300);
    Context.fillText("Read Tutorial: T", 400, 350);
    
    Context.textAlign = "start";
};
