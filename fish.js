var canvas, context;
var fishAry = [];
var btnAry = [];
var mouseman = new MouseManager();
var panes = backgroundSetup();
buttonSetup();
//var max_fish_offset = 0.1;
//max_fish_radius = 2.5;

function init() {
   canvas = document.getElementById('canvas');
   if(canvas.getContext)
      context = canvas.getContext('2d');
   else return;

    canvas.addEventListener('mousemove', function(evt) {
        mouseman.findTarget(evt);   
    });
    canvas.addEventListener('mousedown', function(evt) {
        mouseman.findTarget(evt);   
    });
    canvas.addEventListener('mouseup', function(evt) {
        mouseman.findTarget(evt);   
    });
    
    
    fishAry[0] = new Fish(); 
    setInterval(update, 15);
    setInterval(draw, 15);
}
function update() {
    fishAry.forEach(function update(elem) {
        elem.update();
    });
}

function draw()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    panes.forEach(function draw(elem) {
        elem.draw();
    });
    btnAry.forEach(function draw(elem) {
        elem.draw();
    });
    fishAry.forEach(function draw(elem) {
        elem.draw();
    });
}

function createFish() {
    var newFish = new Fish();
    fishAry.push(newFish);
}

 function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}