///////////////////////////////////////////////////////
//
// Player.js
//
///////////////////////////////////////////////////////

//Single Holder for Player Image Data
var PlayerSprite = new Sprite(1120, 294, 70, 42);
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
        ITEMUP: 6, ITEMDOWN: 7,
        ITEMLEFT: 8, ITEMRIGHT: 9,
        TOTALCOUNT: 10
    };
    for (var i = 0; i < this.ACTIONS.TOTALCOUNT; ++i) {
        //Populates inputVars with false for each ACTION
        this.inputVars.push(false);
    }
    
    //Equipment
    this.equipped = 0;
    this.equipTime = Math.floor(FramesPerSecond * 0.3);
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
	this.drownMax = FramesPerSecond * 1.5;
	this.drownCounter = this.drownMax;
};


Player.prototype.load = function() {
    //A Simple function that takes care of player animation and initialization.
    
    //Set up Player Sprite
    ImageLoader.loadImage(PlayerSprite.image, "images/playersheet.png");
    //Set up Sprite Animations
    PlayerAnims.walkU       = PlayerSprite.loadAnimation(16, 19);
    PlayerAnims.walkD       = PlayerSprite.loadAnimation( 0,  3);
    PlayerAnims.walkL       = PlayerSprite.loadAnimation( 4,  7);
    PlayerAnims.walkR       = PlayerSprite.loadAnimation(20, 23);
    
    PlayerAnims.pickUp      = PlayerSprite.loadAnimation( 8, 11);
    PlayerAnims.eatFood     = PlayerSprite.loadAnimation(24, 27);
    
    PlayerAnims.spearWU     = PlayerSprite.loadAnimation(48, 51);
    PlayerAnims.spearWD     = PlayerSprite.loadAnimation(32, 35);
    PlayerAnims.spearWL     = PlayerSprite.loadAnimation(36, 39);
    PlayerAnims.spearWR     = PlayerSprite.loadAnimation(52, 55);
    
    PlayerAnims.spearSU     = PlayerSprite.loadAnimation(56, 59);
    PlayerAnims.spearSD     = PlayerSprite.loadAnimation(40, 43);
    PlayerAnims.spearSL     = PlayerSprite.loadAnimation(60, 63);
    PlayerAnims.spearSR     = PlayerSprite.loadAnimation(44, 47);
    
    PlayerAnims.axeWU       = PlayerSprite.loadAnimation(80, 83);
    PlayerAnims.axeWD       = PlayerSprite.loadAnimation(64, 67);
    PlayerAnims.axeWL       = PlayerSprite.loadAnimation(68, 71);
    PlayerAnims.axeWR       = PlayerSprite.loadAnimation(84, 87);
    
    PlayerAnims.axeSU       = PlayerSprite.loadAnimation(88, 90);
    PlayerAnims.axeSD       = PlayerSprite.loadAnimation(72, 74);
    PlayerAnims.axeSL       = PlayerSprite.loadAnimation(92, 94);
    PlayerAnims.axeSR       = PlayerSprite.loadAnimation(76, 78);
    
    PlayerAnims.swim        = PlayerSprite.loadAnimation(96, 100);
    PlayerAnims.drown       = PlayerSprite.loadAnimation(101, 103);
};


Player.prototype.die = function(ifs) {
    //Should be called when the player expires
    Player.prototype.update = function() {};
    Player.prototype.draw = function() {};
};


Player.prototype.parseInput = function(ifs) {
    //Checks for input and sets the internal variables accordingly
    
    //If our current Action is interruptable:
    if (this.currentAction < this.ACTIONS.INTERRUPTABLEMARKER) {
        //Check for item usage: if so store target position
        var itemUsePos = {x:-1, y:-1};
        if (this.inputVars[this.ACTIONS.ITEMUP]) {
            this.currentAction = this.ACTIONS.ITEMUP;
            itemUsePos.x = this.x;
            itemUsePos.y = this.y - 40;
        } else if (this.inputVars[this.ACTIONS.ITEMDOWN]) {
            this.currentAction = this.ACTIONS.ITEMDOWN;
            itemUsePos.x = this.x;
            itemUsePos.y = this.y + 40;
        } else if (this.inputVars[this.ACTIONS.ITEMLEFT]) {
            this.currentAction = this.ACTIONS.ITEMLEFT;
            itemUsePos.x = this.x - 40;
            itemUsePos.y = this.y;
        } else if (this.inputVars[this.ACTIONS.ITEMRIGHT]) {
            this.currentAction = this.ACTIONS.ITEMRIGHT;
            itemUsePos.x = this.x + 40;
            itemUsePos.y = this.y;
        }
        
        //If we used an item, deal with it
        if (itemUsePos.x != -1) {
            this.parseItemUse(ifs, itemUsePos);
            return;
        }
        
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
                ++this.equipped;
                this.equipPause = this.equipTime;
                if (this.equipped >= this.EQUIPMENT.TOTALCOUNT)
                    this.equipped = 0;
            } else if (this.inputVars[this.ACTIONS.CYCLEITEMRIGHT] &&
                    !this.inputVars[this.ACTIONS.CYCLEITEMLEFT]) {
                --this.equipped;
                this.equipPause = this.equipTime;
                if (this.equipped < 0)
                    this.equipped = this.EQUIPMENT.TOTALCOUNT - 1;
            }
        } else
            --this.equipPause;
    }
};


Player.prototype.parseItemUse = function(ifs, targetPos) {
    //Handles item usage by case where targetPos is the world
    //  position that the action is being executed on:
    if (this.equipped == this.EQUIPMENT.WOOD) {
        var cell = ifs.obj_array[IslandIndex].posToCell(targetPos);
        ifs.obj_array[IslandIndex].posToCell(targetPos).elevation += 1;
        var dPos = ifs.obj_array[IslandIndex].cellToPos(cell);
    
        var newDam = new Dam(dPos);
        var newIndex = ifs.obj_array.push(newDam) - 1;
        ifs.obj_array[newIndex].ifsIndex = newIndex;
        ifs.obj_array[newIndex].elevation =
            ifs.obj_array[IslandIndex].posToCell(targetPos).elevation;
    }
};

Player.prototype.Stamina = function(){
		var newHunger = new Hunger(20, 30);
		
		//The text of hunger
		Context.fillStyle = "Black";
		//Context.font = "18px arial");
		Context.fillText("Hunger", 20, 20);
		
		//background of the hunger bar
		Context.fillStyle = "Black";
		Context.fillRect(this.x, this.y, this.width, this.height);
		
		//part of the hunger bar that will decrease/increase over time
		Context.fillStyle = "Red";
		Context.fillRect(this.x, this.y, this.width*percent, this.height);
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
                
                if (this.currentAction >= this.ACTIONS.INTERRUPTABLEMARKER)
                    this.animationIndex = PlayerAnims.eatFood;
                    
            } else if (this.equipped == this.EQUIPMENT.WOOD) {
                
                if (this.currentAction >= this.ACTIONS.INTERRUPTABLEMARKER)
                    this.animationIndex = PlayerAnims.pickUp;
                     
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
            if (this.currentAction == this.ACTIONS.ITEMUP)
                this.animationIndex = PlayerAnims.axeSU;
            else if (this.currentAction == this.ACTIONS.ITEMDOWN)
                this.animationIndex = PlayerAnims.axeSD;
            else if (this.currentAction == this.ACTIONS.ITEMLEFT)
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
            if (this.currentAction == this.ACTIONS.ITEMUP)
                this.animationIndex = PlayerAnims.spearSU;
            else if (this.currentAction == this.ACTIONS.ITEMDOWN)
                this.animationIndex = PlayerAnims.spearSD;
            else if (this.currentAction == this.ACTIONS.ITEMLEFT)
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
                if ((this.currentAction >= this.ACTIONS.INTERRUPTABLEMARKER) &&
                        !this.inputVars[this.currentAction]) {
                    //Return to walk left or walk right
                    this.currentAction -= 6;
                    this.animationIndex -= 6;
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
    
    this.parseInput(ifs);
    
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


