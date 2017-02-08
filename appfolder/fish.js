var canvas, context;
var fishAry = [];
var btnAry = [];
var mouseman = new MouseManager();
//var max_fish_offset = 0.1;
//max_fish_radius = 2.5;

function init() {
   canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
   //if(canvas.getContext)
      //context = canvas.getContext('2d');
   //else return;

    canvas.addEventListener('mousemove', function(evt) {
        mouseman.findTarget(evt);   
    });
    canvas.addEventListener('mousedown', function(evt) {
        mouseman.findTarget(evt);   
    });
    canvas.addEventListener('mouseup', function(evt) {
        mouseman.findTarget(evt);   
    });
    
    btnAry[0] = new Button(createFish);
    console.log(createFish);
    btnAry[0].setSpriteAttributes(10, 10, 20, 20, "pressButton");
    btnAry[0].setSrc("http://www.iconsdb.com/icons/preview/blue/square-xxl.png", "http://www.iconsdb.com/icons/preview/blue/square-xxl.png");
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
    
    /*
    
    context.fillStyle = "rgb(150,29,28)";
    context.beginPath(); 
	Fish.move(getRandom(-max_fish_offset,max_fish_offset));
	Fish.stayInsideCanvas();
    context.arc(Fish.getX(), Fish.getY(), 5, 0, Math.PI * 2, true);
    console.log(getRandom(-.1,.1));   
    context.fill();
    context.closePath(); 
    */
    context.clearRect(0, 0, canvas.width, canvas.height);
    fishAry.forEach(function draw(elem) {
        elem.draw();
    }); 
    btnAry.forEach(function draw(elem) {
        elem.draw();
    })
}

function createFish() {
    var newFish = new Fish();
    fishAry.push(newFish);
    console.log(fishAry);
}

 function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
 
 /*
 var Fish =
 {

 // bigger = faster turns
   x:0,
   y:0,
   fish_theta:Math.random(2*Math.PI),
   fish_radius:Math.random(max_fish_radius),
   
   stayInsideCanvas:function(){
	if (this.x < 0) {
		this.x = canvas.width;
	}
	if (this.x > canvas.width) {
		this.x = 0;
	}
	if (this.y < 0) {
	
		this.y = canvas.height;
	}
	if (this.y > canvas.height) {
		this.y = 0;
	}
   },
   
   getX:function(){
	return this.x
   },
   
   getY:function(){
	return this.y
   },
   
   move:function(wander){
   this.fish_theta += wander;
   
   this.x += Math.cos(this.fish_theta)*2;
   this.y += Math.sin(this.fish_theta)*2;
 }
 */

 document.addEventListener("DOMContentLoaded", function()
 {
     init();
 });
 
