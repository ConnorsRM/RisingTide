// Daniel Luna
//-----------------------------------------------------
// GUI / Interface
//-----------------------------------------------------

//A Stack-Based FSM for maintaining GUIs.

//tutorial screen sprite
var TUT_SRN = new Sprite(800, 600, 800, 600);

var InterfaceStack = [];

var Interface = function () {
    //Object Id
    this.id;

    //Variables for counting which frame we are on.
    this.updateFrame = 0;
    this.drawFrame = 0;

    //Input Handling Function
    this.inputHandler;

    //Booleans to test if the room is active or visible
    this.active = false;
    this.visible = false;

    this.init = function () {
        //A variable designed to hold a function that defines this 
        //  Interface's initial state. Personalize this for each object
        //  as necessary. Be sure to keep the code line:
        //  this.id = IterfaceStack.push(this);
        this.id = InterfaceStack.push(this);
    };

    //An array of objects in this interface
    this.obj_array = [];

    //an object of prey Objects
    //will allow check for kill without examining useless things
    this.sqrl_array = [];
};


Interface.prototype.clear = function () {
    //This function is designed to clear the Interface of objects so the
    //  garbage collector can take care of any objects. It calls each
    //  object's remove() function, which should remove any object's
    //  reference to another object (Thus preparing all objects for
    //  deletion).
    for (var i = 0; i < this.obj_array.length; ++i) {
        this.obj_array[i].remove(this);
    }

    this.obj_array = [];
};


Interface.prototype.remove = function () {
    //This function is designed to delete the Interface from the
    //  InterfaceStack (It is left in memory in the event the Interface
    //  needs to be used again).
    if (this.obj_array.length > 0) {
        this.clear();
    }
    for (i = this.id + 1; i < InterfaceStack.length; ++i) {
        --InterfaceStack[i].id;
        InterfaceStack[i - 1] = InterfaceStack[i];
    }
    InterfaceStack.pop();
};


Interface.prototype.reset = function () {
    //This function is designed to set the Interface back to its initial 
    //  state without memory gimmicks. 
    this.clear();
    this.remove();
    this.init();
};


Interface.prototype.activate = function () {
    //This funciton is here to provide a formal method for telling this
    //  Interface to start calling its objects' update functions. For 
    //  now, this is merely a boolean flag. It may be updated here if
    //  more needs to be done.
    this.active = true;
};


Interface.prototype.deactivate = function () {
    //This funciton is here to provide a formal method for telling this
    //  Interface to stop calling its objects' update functions. For 
    //  now, this is merely a boolean flag. It may be updated here if
    //  more needs to be done.
    this.active = false;
};


Interface.prototype.show = function () {
    //This funciton is here to provide a formal method for telling this
    //  Interface to start calling its objects' draw functions. For 
    //  now, this is merely a boolean flag. It may be updated here if
    //  more needs to be done.
    this.visible = true;
};


Interface.prototype.hide = function () {
    //This funciton is here to provide a formal method for telling this
    //  Interface to stop calling its objects' draw functions. For now, 
    //  this is merely a boolean flag. It may be updated here if more 
    //  needs to be done.
    this.visible = false;
};


Interface.prototype.update = function () {
    //Updates all of the objects in the obj_array by calling their
    //  update() function. Passes this object as an argument in case
    //  access to the Interface the object lies in is necessary.
    if (this.active == true) {
        for (var i = 1; i < this.obj_array.length; ++i) {
            this.obj_array[i].update(this);
        }
    }
};


Interface.prototype.draw = function () {
    //Draws all of the objects in the obj_array by calling their draw()
    //  function.

    //don't judge me
    if (this.active == false) {
        console.log(sPause);
        if (sPause == false) {
            TUT_SRN.draw(0, 0, 0, 0);
        } else {
            Sounds[SoundMap.Walk].pause();

            sJournal.displayEntry(entryNum);
        }
    }
    else
    if (this.visible == true) {
        if (this.obj_array[0].camDraw) {
            this.obj_array[0].camDraw(this);
        } else {
            for (var i = 0; i < this.obj_array.length; ++i) {
                this.obj_array[i].draw(this);
            }
        }
    }
};