PImage img;
PImage bac;
String newWords[];

int numBalls = 40;
float spring = 0.001;
int numCount = 0;
int numText = 0;

float friction = -0.9;
Ball[] balls = new Ball[numBalls];

void setup() {
  background(#000000);
  // size(1440, 860);
  size(800,600);
    
  // img = loadImage("sprite2.png");
  // bac = loadImage("beijing.jpg");
  for (int i = 0; i < numBalls; i++) {
    balls[i] = new Ball(random(width), random(height), 60, i, balls);
  }
  noStroke();
  fill(255, 204);
}

void draw() {
  background(#000000);
  String words[] = loadStrings("texts.txt");
  newWords = split(words[0], ',');
  numText = newWords.length;

  for (int i=0;i<balls.length;i++) {
    numCount=i;
    balls[i].collide();
    balls[i].move();
    balls[i].display(); 
    // i.connect();
  }
  // for (Ball i : balls) {
  //   i.collide();
  //   i.move();
  //   i.display(); 
  //   // i.connect();
  // }
}

class Ball {
  
  float x, y;
  float diameter;
  float vx = 0;
  float vy = 0;
  int id;
  Ball[] others;
 
  Ball(float xin, float yin, float din, int idin, Ball[] oin) {
    x = xin;
    y = yin;
    diameter = din;
    id = idin;
    others = oin;
  } 
  
  void collide() {
    for (int i = id + 1; i < numBalls; i++) {
      float dx = others[i].x - x;
      float dy = others[i].y - y;
      float distance = sqrt(dx*dx + dy*dy);
      float minDist = others[i].diameter/2 + diameter/2;
      // if (distance < minDist) { 
      //   float angle = atan2(dy, dx);
      //   float targetX = x + cos(angle) * minDist;
      //   float targetY = y + sin(angle) * minDist;
      //   float ax = (targetX - others[i].x) * spring;
      //   float ay = (targetY - others[i].y) * spring;
      //   vx -= ax;
      //   vy -= ay;
      //   others[i].vx += ax;
      //   others[i].vy += ay;
      // }
      
      if (distance < minDist) { 
        // float angle = atan2(dy, dx);
        // float targetX = x + cos(angle) * distance;
        // float targetY = y + sin(angle) * minDist;
        // float ax = (targetX - others[i].x) * spring;
        // float ay = (targetY - others[i].y) * spring;
        
        float ax= dx*spring;
        float ay= dy*spring;
        vx += ax;
        vy += ay;
        others[i].vx -= ax;
        others[i].vy -= ay;
      }
    }   
  }
  
  void move() {
    float gravityx = random(-0.05,0.05);
    float gravityy = random(-0.05,0.05);
    vy += gravityy;
    vx += gravityx;
    x += vx;
    y += vy;
    if (x + diameter/2 > width) {
      x = width - diameter/2;
      vx *= friction; 
    }
    else if (x - diameter/2 < 0) {
      x = diameter/2;
      vx *= friction;
    }
    if (y + diameter/2 > height) {
      y = height - diameter/2;
      vy *= friction; 
    } 
    else if (y - diameter/2 < 0) {
      y = diameter/2;
      vy *= friction;
    }
  }
  
  void display() {
    // ellipse(x, y, diameter, diameter);
     // imageMode(CENTER);
     // image(img, x,y);
     
     textSize(30);
     fill(#F59219);
     if(numText<=numBalls){
       if(numCount<numText){
         text(newWords[numText-1-numCount], x, y);
         textAlign(CENTER);
       }
     }
     if(numText>numBalls){
       text(newWords[numText-1-numCount], x, y);
       textAlign(CENTER);
     }
  }
  
  void connect(){
    for (int i = id + 1; i < numBalls; i++) {
      float dx = others[i].x - x;
      float dy = others[i].y - y;
      float distance = sqrt(dx*dx + dy*dy);
      float minDist = others[i].diameter + diameter;
      if (distance < minDist*2){ 
        // float angle = atan2(dy, dx);
        // float targetX = x + cos(angle) * minDist;
        // float targetY = y + sin(angle) * minDist;
        // float ax = (targetX - others[i].x) * spring;
        // float ay = (targetY - others[i].y) * spring;DJSJOJD
        // vx -= ax;
        // vy -= ay;
        // others[i].vx += ax;
        // others[i].vy += ay;'
        stroke(200);
        line(others[i].x,others[i].y,x,y);
        
        // beginShape();
        // curveVertex(x, y-5);
        // curveVertex(x, y-5);
        // curveVertex(others[i].x, others[i].y-5);
        // curveVertex(others[i].x, others[i].y+5);
        // curveVertex(x, y+5);
        // curveVertex(x, y-5);
        // curveVertex(x, y-5);
        // endShape();
      }
    }   
  }
}
