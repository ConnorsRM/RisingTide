///////////////////////////////////////////////////////
//
// Player.js
//
///////////////////////////////////////////////////////

//Single Holder for Player Image Data
var PlayerSprite = new Sprite(881, 335, 70, 42);
//Single Holder for Player Animation Indices
var PlayerAnims = {};


var Player = function (pos){
    //sprite things
    this.spr = PlayerSprite;
    this.imageIndex = 0;
    this.animationIndex = 0;
    this.animationFreq = 3;
    this.animationCounter = 0;
    
	//position
	this.x = pos.x;
	this.y = pos.y;
	
	//Movement
    this.speed = 6;
    this.speedMod = 1;
    this.direction = 1;
	this.DIRECTIONS = {
        UP:     0,
        DOWN:   1,
        LEFT:   2,
        RIGHT:  3
    };
    
    //Input
    this.inputVars = [];
    this.currentAction = -1;
    this.ACTIONS = {
        UP: 0, DOWN: 1, LEFT: 2, RIGHT: 3,
        CYCLEITEMLEFT: 4, CYCLEITEMRIGHT: 5,
        //Actions Below this line are uninterruptible
        INTERRUPTABLEMARKER: 6,
        ITEMLEFT: 6, ITEMRIGHT: 7,
        TOTALCOUNT: 8
    };
    for (var i = 0; i < this.ACTIONS.TOTALCOUNT; ++i) {
        //Populates inputVars with false for each ACTION
        this.inputVars.push(false);
    }
    
    //Equipment
    this.equipped = 0;
    this.equipTime = Math.floor(FramesPerSecond * 0.1);
    this.equipPause = 0;
    this.EQUIPMENT = {
        //Items that don't appear when walking:
        FOOD:   0,
        WOOD:   1,
        FREEHANDSCOUNT: 2,
        //Items that appear when walking:
        AXE:    2,
        SPEAR:  3,
        TOTALCOUNT: 4
    };
	
	//Drowning
	this.drownMax = FramesPerSecond * 1;
	this.drownCounter = this.drownMax;
};


Player.prototype.load = function() {
    //A Simple function that takes care of player animation and initialization.
    
    //Set up Player Sprite
    ImageLoader.loadImage(PlayerSprite.image, "images/playersheetTrans.png");
    //Set up Sprite Animations
    PlayerAnims.walkD       = PlayerSprite.loadAnimation( 0,  3);
    PlayerAnims.walkL       = PlayerSprite.loadAnimation( 4,  7);
    PlayerAnims.pickUp      = PlayerSprite.loadAnimation( 8, 11); 
    PlayerAnims.walkU       = PlayerSprite.loadAnimation(12, 15);
    PlayerAnims.walkR       = PlayerSprite.loadAnimation(16, 19);
    PlayerAnims.eatFood     = PlayerSprite.loadAnimation(20, 23);
    PlayerAnims.spearWD     = PlayerSprite.loadAnimation(24, 27);
    PlayerAnims.spearWL     = PlayerSprite.loadAnimation(28, 31);
    PlayerAnims.spearSR     = PlayerSprite.loadAnimation(32, 35);
    PlayerAnims.spearWU     = PlayerSprite.loadAnimation(36, 39);
    PlayerAnims.spearWR     = PlayerSprite.loadAnimation(40, 43);
    PlayerAnims.spearSL     = PlayerSprite.loadAnimation(44, 47);
    PlayerAnims.axeWD       = PlayerSprite.loadAnimation(48, 51);
    PlayerAnims.axeWL       = PlayerSprite.loadAnimation(52, 55);
    PlayerAnims.axeSR       = PlayerSprite.loadAnimation(56, 58);
    PlayerAnims.axeWU       = PlayerSprite.loadAnimation(60, 63);
    PlayerAnims.axeWR       = PlayerSprite.loadAnimation(64, 67);
    PlayerAnims.axeSL       = PlayerSprite.loadAnimation(68, 70);
    PlayerAnims.swim        = PlayerSprite.loadAnimation(72, 76);
    PlayerAnims.drown       = PlayerSprite.loadAnimation(84, 86);
};


Player.prototype.die = function(ifs) {
    //Should be called when the player expires
    Player.prototype.update = function() {};
    Player.prototype.draw = function() {};
};


Player.prototype.parseInput = function() {
    //Checks for input and sets the internal variables accordingly
    
    //If our current Action is interruptable:
    if (this.currentAction < this.ACTIONS.INTERRUPTABLEMARKER) {
        //Test if we're not trying to move:
        if (!this.inputVars[this.ACTIONS.UP] && !this.inputVars[this.ACTIONS.DOWN] &&
                !this.inputVars[this.ACTIONS.LEFT] && !this.inputVars[this.ACTIONS.RIGHT]) {
            //If so, keep the imageIndex at the idle position of 0
            if (this.currentAction < 4) {
                this.imageIndex = 0;
                this.animationCounter = 0;
            }
        } else {
            //Vertical Movement Input
            if (this.inputVars[this.ACTIONS.UP] &&
                    !this.inputVars[this.ACTIONS.DOWN]) {
                this.y -= this.speed * this.speedMod;
                this.direction = this.DIRECTIONS.UP;
                if (this.currentAction != this.ACTIONS.UP)
                    this.frameIndex = 0;
                this.currentAction = this.ACTIONS.UP;
            } else if (this.inputVars[this.ACTIONS.DOWN] &&
                    !this.inputVars[this.ACTIONS.UP]) {
                this.y += this.speed * this.speedMod;
                this.direction = this.DIRECTIONS.DOWN;
                if (this.currentAction != this.ACTIONS.DOWN)
                    this.frameIndex = 0;
                this.currentAction = this.ACTIONS.DOWN;
            }
            
            //Horizontal Movement Input
            if (this.inputVars[this.ACTIONS.LEFT] &&
                    !this.inputVars[this.ACTIONS.RIGHT]) {
                this.x -= this.speed * this.speedMod;
                this.direction = this.DIRECTIONS.LEFT;
                if (this.currentAction != this.ACTIONS.LEFT)
                    this.frameIndex = 0;
                this.currentAction = this.ACTIONS.LEFT;
            } else if (this.inputVars[this.ACTIONS.RIGHT] &&
                    !this.inputVars[this.ACTIONS.LEFT]) {
                this.x += this.speed * this.speedMod;
                this.direction = this.DIRECTIONS.RIGHT;
                if (this.currentAction != this.ACTIONS.RIGHT)
                    this.frameIndex = 0;
                this.currentAction = this.ACTIONS.RIGHT;
            }
        }
            
        //Check for item cycling
        if (this.equipPause <= 0) {
            if (this.inputVars[this.ACTIONS.CYCLEITEMLEFT] &&
                    !this.inputVars[this.ACTIONS.CYCLEITEMRIGHT]) {
                --this.equipped;
                this.equipPause = this.equipTime;
                if (this.equipped < 0)
                    this.equipped = this.EQUIPMENT.TOTALCOUNT - 1;
            } else if (this.inputVars[this.ACTIONS.CYCLEITEMRIGHT] &&
                    !this.inputVars[this.ACTIONS.CYCLEITEMLEFT]) {
                ++this.equipped;
                this.equipPause = this.equipTime;
                if (this.equipped >= this.EQUIPMENT.TOTALCOUNT)
                    this.equipped = 0;
            }
        } else
            --this.equipPause;
        
        //Check for item usage 
        if (this.inputVars[this.ACTIONS.ITEMLEFT])
            this.currentAction = this.ACTIONS.ITEMLEFT;
        else if (this.inputVars[this.ACTIONS.ITEMRIGHT])
            this.currentAction = this.ACTIONS.ITEMRIGHT;
    }
};


Player.prototype.parseAnimation = function() {
    //Code to figure out what frame of what animation we are interested
    //  in drawing.
    
    //Store Previous Animation
    var previousAnim = this.animationIndex;
    
    //First Check if we are swimming / drowning
    if (this.drownCounter < this.drownMax) {
        this.animationIndex = PlayerAnims.swim;
        if (this.drownCounter < this.drownMax * .5) {
            this.animationIndex = PlayerAnims.drown;
        }
    } else {
        //Equipment Dependant Animations go here:
        if (this.equipped < this.EQUIPMENT.FREEHANDSCOUNT) {    //No Visible Item Carried
            
            //Movement
            if (this.currentAction == this.ACTIONS.DOWN)
                this.animationIndex = PlayerAnims.walkD;
            else if (this.currentAction == this.ACTIONS.LEFT)
                this.animationIndex = PlayerAnims.walkL;
            else if (this.currentAction == this.ACTIONS.UP)
                this.animationIndex = PlayerAnims.walkU;
            else if (this.currentAction == this.ACTIONS.RIGHT)
                this.animationIndex = PlayerAnims.walkR;
                
            //Check for Item Usage
            if (this.equipped == this.EQUIPMENT.FOOD) {
                
                if (this.currentAction == this.ACTIONS.ITEMLEFT ||
                  this.currentAction == this.ACTIONS.ITEMRIGHT)
                    this.animationIndex = PlayerAnims.eatFood;
                    
            } else if (this.equipped == this.EQUIPMENT.WOOD) {
                
                if (this.currentAction == this.ACTIONS.ITEMLEFT ||
                  this.currentAction == this.ACTIONS.ITEMRIGHT)
                    this.animationIndex == PlayerAnims.pickUP;
                     
            }
                
        } else if (this.equipped == this.EQUIPMENT.AXE) {   //Axe Equipped
            
            //Movement
            if (this.currentAction == this.ACTIONS.DOWN)
                this.animationIndex = PlayerAnims.axeWD;
            else if (this.currentAction == this.ACTIONS.LEFT)
                this.animationIndex = PlayerAnims.axeWL;
            else if (this.currentAction == this.ACTIONS.UP)
                this.animationIndex = PlayerAnims.axeWU;
            else if (this.currentAction == this.ACTIONS.RIGHT)
                this.animationIndex = PlayerAnims.axeWR;
            
            //Check for Item Usage
            if (this.currentAction == this.ACTIONS.ITEMLEFT)
                this.animationIndex = PlayerAnims.axeSL;
            else if (this.currentAction == this.ACTIONS.ITEMRIGHT)
                this.animationIndex = PlayerAnims.axeSR;
                
        } else if (this.equipped == this.EQUIPMENT.SPEAR) { //Spear Equipped
            
            //Movement
            if (this.currentAction == this.ACTIONS.DOWN)
                this.animationIndex = PlayerAnims.spearWD;
            else if (this.currentAction == this.ACTIONS.LEFT)
                this.animationIndex = PlayerAnims.spearWL;
            else if (this.currentAction == this.ACTIONS.UP)
                this.animationIndex = PlayerAnims.spearWU;
            else if (this.currentAction == this.ACTIONS.RIGHT)
                this.animationIndex = PlayerAnims.spearWR;
            
            //Check for Item Usage
            if (this.currentAction == this.ACTIONS.ITEMLEFT)
                this.animationIndex = PlayerAnims.spearSL;
            else if (this.currentAction == this.ACTIONS.ITEMRIGHT)
                this.animationIndex = PlayerAnims.spearSR;
                    
        }
    }
    
    this.updateAnimation(previousAnim);
};


Player.prototype.updateAnimation = function(prevAnim) {
    //Manage Animation Indexing (only necessary if we maintained animations)
    
    if (this.animationIndex == prevAnim) {
        
        this.animationCounter++;
        if (this.animationCounter >= this.animationFreq) {
            this.animationCounter = 0;
            this.imageIndex++;
            //If the animation is over
            if(this.imageIndex >= this.spr.maxFrames) {
                this.imageIndex = 0;    //Start back at the start
                
                //And if this animation is supposed to only run once:
                if (this.currentAction >= this.ACTIONS.INTERRUPTABLEMARKER) {
                    //Return to walk left or walk right
                    this.currentAction = (this.currentAction % 2) + 2;
                    if (this.currentAction == this.ACTIONS.LEFT)
                        this.animationIndex = PlayerAnims.walkL;
                    else if (this.currentAction == this.ACTIONS.RIGHT)
                        this.animationIndex = PlayerAnims.walkR;
                }
                
            }
        }
        
    } else {
        this.imageIndex = 0;
        this.animationCounter = 0;
    }
};


Player.prototype.draw = function(camera){
    
    this.parseAnimation();
    
	this.spr.draw(this.animationIndex, this.imageIndex,
	this.x - this.spr.frameWidth / 2 - camera.x + camera.viewWidth, 
	this.y - this.spr.frameWidth / 2 - camera.y + camera.viewHeight);

};


Player.prototype.update = function(ifs){
    
    this.parseInput();
    
    //Player Position Validation
    this.x = Math.min(Math.max(this.x, 0), WORLD_DIMENSION);
    this.y = Math.min(Math.max(this.y, 0), WORLD_DIMENSION);
    
    //Set Camera to this Position
    ifs.obj_array[CameraIndex].moveCamera(this.x + DRAW_OFFSET_WIDTH, this.y + DRAW_OFFSET_HEIGHT);
    
    //Check For Drowning
    if (ifs.obj_array[IslandIndex].posToCell({x:this.x, y:this.y}).tile == 0) {
        --this.drownCounter;
        this.speedMod -= 1.0 / this.drownMax;
        if (this.drownCounter <= 0) {
            this.die(ifs);
        }
    } else {
        this.drownCounter = this.drownMax;
        this.speedMod = 1;
    }
    
};


