///////////////////////////////////////////////////////////////////////
//
// Sounds.js
// Sounds Found by Alex Girard
//
///////////////////////////////////////////////////////////////////////

//Holds Sound Data
var Sounds = [];

//Holds Sound Indices
var SoundMap = {};


function loadSounds() { //loads all sounds for the game
    //Water Rising (Size 3)
    SoundMap.WaterRisingSize = 3;
    SoundMap.WaterRising = Sounds.push(new Audio("sounds/waterRising1.wav")) - 1;
    Sounds.push(new Audio("sounds/waterRising2.wav"));
    Sounds.push(new Audio("sounds/waterRising3.wav"));
    
    //Axe Chop
    SoundMap.ChopSize = 6;
    SoundMap.Chop = Sounds.push(new Audio("sounds/chop1.wav")) - 1;
    Sounds.push(new Audio("sounds/chop2.wav"));
    Sounds.push(new Audio("sounds/chop3.wav"));
    Sounds.push(new Audio("sounds/chop4.wav"));
    Sounds.push(new Audio("sounds/chop5.wav"));
    Sounds.push(new Audio("sounds/chop6.wav"));
    
    //Walk
    SoundMap.Walk = Sounds.push(new Audio("sounds/walk.wav")) - 1;
    
    //Eat
    SoundMap.Eat = Sounds.push(new Audio("sounds/eat.mp3")) - 1;
    
    Sounds[SoundMap.Walk].addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

};
