//Floor pixel limit: 580
var idleStart = 1;
var walkStart = 1;
var runStart = 1;
var jumpStart = 1;
size(1280, 720);
var bg1 = loadImage("bg1.png");
var keyZ = loadImage("keyZ_48px.png");
var keySpace = loadImage("keySpace_48px.png");
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
var j = 1;
var r = 1;
var gravity = 0;
var scrolling = 0;

var timer = 0;
var left, right, up, down, jumpu, dirL, running = false;
var dirR = true;

var Screen = {
  x: 1280,
  y: 720
};

var setup = function(){
  frameRate(30);
}

//SPRITE IDLE ANIMATION ARRAY LOAD
while(idleStart < 17){
    idle[idleStart] = loadImage("Idle_(" + idleStart + ").png");
    idleStart++;
}

//SPRITE WALK ANIMATION ARRAY LOAD
while(walkStart < 21){
    walk[walkStart] = loadImage("Walk_(" + walkStart + ").png");
    walkStart++;
}

//SPRITE JUMP ANIMATION ARRAY LOAD
while(jumpStart < 31){
    jump[jumpStart] = loadImage("Jump_(" + jumpStart + ").png");
    jumpStart++;
}

//SPRITE RUN ANIMATION ARRAY LOAD
while(runStart < 21){
    run[runStart] = loadImage("Run_(" + runStart + ").png");
    runStart++;
}


var player = {
  xpos: 600,
  ypos: 560,
  size: 100,
  speed: 10,
};

var drawPlayer = function(){
  

//IDLE ANIMATION LOOP
 idleUse = idle[i];

 if(i < idle.length){
   i++;
 } 
 if(i >= 15){
   i = 1;
 }
 
//WALK ANIMATION LOOP
 walkUse = walk[w];

 if(w < walk.length){
   w++;
 } 
 if(w >= 19){
   w = 1;
 }
 
//JUMP ANIMATION LOOP
 jumpUse = jump[j];

 if(j < jump.length){
   j++;
 } 
 if(j >= 19){
   j = 1;
 }
 
//RUN ANIMATION LOOP
runUse = run[r];

if(r < run.length){
 r++;
} 
if(r >= 19){
 r = 1;
}


}





var draw = function() {
  animation = idleUse;
  timer++;
  image(bg1,0+scrolling,0,Screen.x,Screen.y);
  image(bg1,Screen.x+scrolling,0,Screen.x,Screen.y);
  image(bg1,-Screen.x+scrolling,0,Screen.x,Screen.y);
  image(bg1,(2*Screen.x)+scrolling,0,Screen.x,Screen.y);
  image(bg1,-(2*Screen.x)+scrolling,0,Screen.x,Screen.y);
  
  
  drawPlayer();
  
  jumping();
  
    
  if(right){
    
    if(running){
      image(runUse, player.xpos,player.ypos,player.size,player.size);
      player.xpos += player.speed*2;
    }
    else{
      image(walkUse, player.xpos,player.ypos,player.size,player.size);
      player.xpos += player.speed;
    }
    
  }
  
  else if(left){
    
   
    
    if(running){
      pushMatrix();
    translate(player.xpos, player.ypos)
    scale(-1.0, 1.0);
    image(runUse, - walkUse.width + 300,0,player.size,player.size);
    popMatrix();
      player.xpos -= player.speed*2;
    }
    else{
       pushMatrix();
    translate(player.xpos, player.ypos)
    scale(-1.0, 1.0);
    image(walkUse, - walkUse.width + 300,0,player.size,player.size);
    popMatrix();
      player.xpos -= player.speed;
    }
  }
  
  else if(dirL) {
    
    pushMatrix();
    translate(player.xpos, player.ypos)
    scale(-1.0, 1.0);
        if(jumpu && player.xpos != 560){
          image(jumpUse, - idleUse.width + 300,0,player.size,player.size);
        } 
        else if(running && left){
          image(runUse, - idleUse.width + 300,0,player.size,player.size);
        }
        else {
        image(idleUse, - idleUse.width + 300,0,player.size,player.size);
        }
    popMatrix();
    
  } 
  
  
  else if (dirR) {
    if(jumpu && player.xpos != 560){
      image(jumpUse, player.xpos,player.ypos,player.size,player.size);
    } 
    else if(running && right){
      image(runUse, player.xpos,player.ypos,player.size,player.size);
    }
    else {
      image(idleUse, player.xpos,player.ypos,player.size,player.size);
    }
  }
  
  
 
  //Floor
  if (player.ypos > 560){
    player.ypos = 560;
  }
  
  //BG Scrolling
  if (player. xpos > 800){
    if(running){
      scrolling -= player.speed*2;
    }
    else{
      scrolling -= player.speed;
    }
    player.xpos = 800;
  }
  if (player.xpos < 350){
    if(running){
      scrolling += player.speed*2;
    }
    else{
      scrolling += player.speed;
    }
    player.xpos = 350;
  }
  
  
  
  UI();
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
  //Z Key
  if(keyCode === 90){
    running = true;
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
  //Z Key
  if(keyCode === 90){
    running = false;
  }
}


var jumping = function(){
  
  if(jumpu){
    
    player.ypos -= 20;
  }
  else {
    player.ypos += 20;
  }
  
 player.ypos += gravity
  
 
}

var UI = function(){
  textSize(24);
  image(keyZ, 30, 20, 48, 48);
  text("= Run", 90, 50);
  image(keySpace, 30, 80, 48, 48);
  text("= Jump", 90, 110);
};