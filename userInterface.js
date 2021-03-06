/* GENERAL UI NOTES:
 * There are lots of integer coordinates for the current UI, for scalability purposes, 
 they should be changed to fractions of the screen width and height. 
*/


/* ui_values
* List of various source arrays for image resources and data objects like the attribute list. 
Most of these elements are in a SPECIFIC order to accomodate the code. 
Something more general would probably be more efficient if we intend to add more animals or animal variations. 
*/
var ui_values = {
    
};

/* backgroundSetup() - For setting up, non-button elements of the canvas, like the map and the pane that holds all of the attributes. 
 * Params - None. 
 * Returns - An array of panes that the game.init will push into the screen array. 
*/
function backgroundSetup() {
    "use strict";
    var panes = [], aquarium;
    
    aquarium = new Sprite();
    aquarium.setSrc("aquariumBackground.jpg");
    aquarium.setSpriteAttributes(0, 0, 800, 500, "attributesPane");
    panes.push(aquarium);
    
    return panes;
}

/* buttonSetup() - For setting up, button elements of the canvas.
 * Params - None. 
 * Returns - None. 
*/
function buttonSetup() {
    btnAry[0] = new Button(createFish);
    btnAry[0].setSpriteAttributes(10, 10, 20, 20, "pressButton");
    btnAry[0].setSrc("http://www.iconsdb.com/icons/preview/blue/square-xxl.png", "http://www.iconsdb.com/icons/preview/blue/square-xxl.png");
}



//Small utility function that converts a number to a string and returns the length. 
//Good for text alignment, but not perfect. 
function numberLen(num) {
    return num.toString().length;
}

function debug() {
    console.log("Debug");
}
