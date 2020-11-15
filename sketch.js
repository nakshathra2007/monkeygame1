var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,survivalTime=0;
var PLAY=1;
var END=0;
var gameState= PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  FoodGroup = createGroup();
  obstacleGroup=createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  score=0;
}

 
function draw() {

  background("white");
  
 if(gameState===PLAY){
   
   if(ground.x<0){
    ground.x=ground.width/2
  }
  
  
  if(keyDown("space")){
    monkey.velocityY=-12;
    }
  
  monkey.velocityY= monkey.velocityY+0.8;
   
   food();
  obstacles();
  
   if(obstacleGroup.isTouching(monkey)){
     gameState=END;
   }
 }
  else if(gameState===END){
    ground.velocityX=0;
    monkey.velocityX=0;
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
  }
 
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survivalTime:"+survivalTime,100,50);
  
   monkey.collide(ground);
  
  
  
  drawSprites();
}

function food(){
  if (frameCount%80===0){
    var banana=createSprite(600,200,20,30);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-3;
    
    banana.lifetime=200;
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%300===0){
    var obstacle=createSprite(600,315,10,40);
    obstacle.velocityX=-3;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
  }
}








