Fish[] fish = new Fish[1];

void setup()
{
 size(1000, 1000);
 background(50);
 fill(200);
 noStroke();
 
 for (int i=0; i<fish.length; i++)
 {
   fish[i] = new Fish(random(width), random(height));
 }
}

void draw()
{
 background(50);
 
 for (int i=0; i<fish.length; i++)
 {
   fish[i].stayInsideCanvas();
   fish[i].move();
   ellipse(fish[i].getX(), fish[i].getY(), 20, 20);
 }
}
class Fish
{
 float x;
 float y;
 float fish_theta;
 float fish_radius;
 
 // bigger = more edgier, hectic
 float max_fish_offset = 0.1;
 // bigger = faster turns
 float max_fish_radius = 2.5;
 
 Fish(float _x, float _y)
 {
   x = _x;
   y = _y;
   
   fish_theta = random(TWO_PI);
   fish_radius = random(max_fish_radius);
 }
 
 void stayInsideCanvas()
 {
  if (x < 0) {
    x = width;
  }
  if (x > width) {
    x = 0;
  }
  if (y < 0) {
    y = height;
  }
  if (y > height) {
    y = 0;
  }
 }
 
 void move()
 {
   float wander_offset = random(-max_fish_offset, max_fish_offset);
   fish_theta += wander_offset;
   
   x += cos(fish_theta)*2;
   y += sin(fish_theta)*2;
 }
 
 float getX()
 {
   return x;
 }
 
 float getY()
 {
   return y;
 }
}