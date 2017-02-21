/*
var Fish =
 {

 // bigger = faster turns
   x:0,
   y:0,
   fish_theta:Math.random(2*Math.PI),
   fish_radius:Math.random(max_fish_radius),
   
   getX:function(){
	return this.x
   },
   
   getY:function(){
	return this.y
   },
   
   
 
};
*/
 
function update() {
    //this.move(getRandom(-this.max_fish_offset,this.max_fish_offset));
    this.move();
    this.canvasBoundCheck();
}

function draw() {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
}

function move(){
    /*
   this.fish_theta += wander;

   this.x += Math.cos(this.fish_theta)*2;
        console.log(this.x); 
   this.y -= Math.sin(this.fish_theta)*2;
   */
    this.x += this.xMove;
    if (Math.abs(this.yMove) < .5) {
        if (this.yMove > 0) {
            this.yMove *= 1.005 + Math.random() / 100;
        }
        else {
            this.yMove *= 1.005 + Math.random() / 100;
        }
    }
    this.y += this.yMove;
    
}

function canvasBoundCheck() {
	if (this.x < 0 + this.width) {
        this.xMove = 1;
		//this.x = 0;
	}
	else if (this.x > canvas.width - this.width) {
		//this.x = canvas.width;
        this.xMove = -1;
	}
	if (this.y < this.yOrigin + this.yRange["top"] || this.y < 0 + this.height) {
		this.yMove = .1;
        //this.y = 0;
	}
	else if (this.y > this.yOrigin + this.yRange["bottom"] || this.y > canvas.height - this.height) {
		this.yMove = -.1;
        //this.y = canvas.height;
	}
}
    
function Fish() {
    Sprite.call(this);
    //this.max_fish_offset = 10;
    //this.fish_theta = Math.random(2*Math.PI)
    this.xOrigin = Math.round(Math.random()*16) * 50;
    this.yOrigin = Math.round(Math.random()*10) * 50;
    this.setSpriteAttributes(this.xOrigin, this.yOrigin, 10, 10, "fish");
    this.setSrc("http://www.clipartkid.com/images/24/red-dot-clip-art-at-clker-com-vector-clip-art-online-royalty-free-W1ZD5z-clipart.png");
    this.center();
    
    this.xMove = 1;
    this.yMove = .5;
    this.yRange = {
        top: -30,
        bottom: 30
    }
}
Fish.prototype = Object.create(Sprite.prototype);
Fish.prototype.constructor = Fish;
Fish.prototype.update = update;
Fish.prototype.draw = draw;
Fish.prototype.move = move;
Fish.prototype.canvasBoundCheck = canvasBoundCheck;
