var canvas, context;
var max_fish_offset = 0.1;
max_fish_radius = 2.5;
function init()

{
   canvas = document.getElementById('canvas');
   if(canvas.getContext)
      context = canvas.getContext('2d');
   else return;

   setInterval(draw, 1000 / 60);
}

function draw()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgb(150,29,28)";
    context.beginPath(); 
	Fish.move(getRandom(-max_fish_offset,max_fish_offset));
	Fish.stayInsideCanvas();
    context.arc(Fish.getX(), Fish.getY(), 5, 0, Math.PI * 2, true);
   console.log(getRandom(-.1,.1));   
    context.fill();
    context.closePath(); 

    
}


 function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
 
 
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
 
};
 
