//Floor pixel limit: 580
var idleStart = 1;
var walkStart = 1;
var runStart = 1;
var jumpStart = 1;
size(1280, 720);
var bg1 = loadImage("bg1.png");
var idle = [];
var idleUse;
var runUse;
var walkUse;
var jumpUse;
var animation;
var walk = [];
var run = [];
var jump =[];
var i = 1;
var w = 1;


var timer = 0;
var left, right, up, down, jumpu, dirL = false;
var dirR = true;

var Screen = {
  x: 1280,
  y: 720
};

var setup = function(){
  frameRate(30);
}

while(idleStart < 17){
    idle[idleStart] = loadImage("Idle_(" + idleStart + ").png");
    idleStart++;
}

while(walkStart < 21){
    walk[walkStart] = loadImage("Walk_(" + walkStart + ").png");
    walkStart++;
}

var player = {
  xpos: 600,
  ypos: 580,
  size: 100
};

var drawPlayer = function(){
  
  idleUse = idle[i];

 if(i < idle.length){
   i++;
 } 
 if(i >= 15){
   i = 1;
 }
 
 walkUse = walk[w];

 if(w < walk.length){
   w++;
 } 
 if(w >= 19){
   w = 1;
 }


}





var draw = function() {
  animation = idleUse;
  timer++;
  image(bg1,0,0,Screen.x,Screen.y);
  
  drawPlayer();
  
  
  
    
  if(right){
    image(walkUse, player.xpos,player.ypos,player.size,player.size);
    player.xpos += 10;
  }
  
  else if(left){
    
    pushMatrix();
    translate(player.xpos, player.ypos)
    scale(-1.0, 1.0);
    image(walkUse, - walkUse.width + 300,0,player.size,player.size);
    popMatrix();
    
    player.xpos -= 10;  
    
  }
  
  else if(dirL) {
    
    pushMatrix();
    translate(player.xpos, player.ypos)
    scale(-1.0, 1.0);
    image(idleUse, - idleUse.width + 300,0,player.size,player.size);
    popMatrix();
    
  } 
  
  else if (dirR) {
    image(idleUse, player.xpos,player.ypos,player.size,player.size);
  }
  
 
 

  if (player.ypos > 580){
    player.ypos = 580;
  }
};




var keyPressed = function(){
  if(keyCode === RIGHT){
    right = true;
    dirR = true;
    dirL = false;
  }
  if(keyCode === LEFT){
    left = true;
    dirL = true;
    dirR = false;
  }
  if(keyCode === UP){
    up = true;
  }
  if(keyCode === DOWN){
    down = true;
  }
  //SpaceKey
  if(keyCode === 32 ){
    jumpu = true;
  }
}

var keyReleased = function(){
  if(keyCode === RIGHT){
    right = false;
  }
  if(keyCode === LEFT){
    left = false;
  }
  if(keyCode === UP){
    up = false;
  }
  if(keyCode === DOWN){
    down = false;
  }
  //SpaceKey
  if(keyCode === 32){
    jumpu = false;
  }
}