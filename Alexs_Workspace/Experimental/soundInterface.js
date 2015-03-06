function loadSounds() { //loads all sounds for the game
    var waterRise = new Audio("ambientSounds/waterRising1.wav");
    var waterRise2 = new Audio("ambientSounds/waterRising2.wav");
    var waterRise3 = new Audio("ambientSounds/waterRising3.wav");
    var chop = new Audio("itemSounds/axe/chop1.wav");
    var chop2 = new Audio("itemSounds/axe/chop2.wav");
    var chop3 = new Audio("itemSounds/axe/chop3.wav");
    var chop4 = new Audio("itemSounds/axe/chop4.wav");
    var chop5 = new Audio("itemSounds/axe/chop5.wav");
    var chop6 = new Audio("itemSounds/axe/chop6.wav");
    var walk = new Audio("playerSounds/walk.wav");
    var eat = new Audio("playerSounds/eat.mp3")

}

//plays the desired sound
function playSound(sound) {
    sound.Play();
}

function stopSound(sound){
    sound.stop();
}