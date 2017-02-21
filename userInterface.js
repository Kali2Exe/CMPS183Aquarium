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
    //Capitalized for the sake of displaying, 
    //when using these to acquire data from animal.js, 
    //make sure to use "toLowerCase()".
    animalAry: ["Bird", "Deer", "Frog", "Bunny"],
    animalSrcAry: [("image_resources/Icon_Bird.png"),
                  ("image_resources/Icon_Deer.png"),
                  ("image_resources/frogpng_1024_noAlpha.png"),
                  ("image_resources/Icon_Rabbit.jpeg"),
                  ("images/nwalk1.jpg")],
    
    //For gif animations, though I didn't figure out how to make them do gif things. 
    animalGifAry: [("image_resources/Icon_Bird.png"),
                  ("image_resources/Icon_Deer.png"),
                  ("image_resources/FrogSpriteSheet200_1400x1400.png"),
                  ("image_resources/AnimBunny.gif")],

    currentAnimal: "Bird",
    attributes: ["armor", "speed", "capacity", "lifespan"]
};

/* backgroundSetup() - For setting up, non-button elements of the canvas, like the map and the pane that holds all of the attributes. 
 * Params - None. 
 * Returns - An array of panes that the game.init will push into the screen array. 
 * Notes: There are many variables in this function that could be combined into one single variable, 
 but I've created multiple for readability's sake. 
*/
function backgroundSetup() {
    "use strict";
    var panes = [], i, j, aquarium, uiPane;
    
    aquarium = new Sprite();
    aquarium.setSrc("aquariumBackground.jpg");
    aquarium.setSpriteAttributes(0, 0, 800, 500, "attributesPane");
    panes.push(aquarium);
    
    return panes;
}

/* buttonSetup() - For setting up, button elements of the canvas.
 * Params - None. 
 * Returns - None. 
 * Notes: There is a small cheat here in which UI elements that have tooltips 
 (even if they are not meant to call a function) are being used as buttons. 
 * IMPORTANT: For tooltips to be updated regularly, you must manually change the button's update function to adapt the value. 
 That, or have a function elsewhere that changes 'btn.text' for the button's draw function. 
*/
function buttonSetup() {
    btnAry[0] = new Button(createFish);
    console.log(createFish);
    btnAry[0].setSpriteAttributes(10, 10, 20, 20, "pressButton");
    btnAry[0].setSrc("http://www.iconsdb.com/icons/preview/blue/square-xxl.png", "http://www.iconsdb.com/icons/preview/blue/square-xxl.png");
}
//Small utility function that converts a number to a string and returns the length. 
//Good for text alignment, but not perfect. 
function numberLen(num) {
    return num.toString().length;
}