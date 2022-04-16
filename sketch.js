
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var spaceShip;
var backImg, spacei, rock1Img, rock2Img, laserImg, Ufo, ufo2, bullet;
var ufo, obstaclegroup;
//var laser;
var shoot;
var score;
var laser;
var obstacle;
var END = 3;
var PLAY = 2;
var START = 1;
var Direction = 0.1;
var BEGIN = 0;
var gameState = 0;
var fillForm;
var sButton, dButton,ButtonImg,sbmButton;
var GameTitle;
var box, shootgroup, leaderboard;
var database;
var backgM, Backbutton;

function preload(){
  backImg = loadImage("assets/backg.jpg");
  spacei = loadImage("assets/fighter2.png");
  rock1Img = loadImage("assets/rock1.png");
  rock2Img = loadImage("assets/rock2.png");
  laserImg = loadImage("assets/laser.png");
  Ufo = loadImage("assets/ufo1.png");
  ufo2 = loadImage("assets/ufo2.png")
  bullet = loadImage("assets/bullet.png");
  ButtonImg = loadImage("assets/start.png");
  ButtonImg = loadImage("assets/start.png");
  tBgI = loadImage("assets/backg2.jpg");
  backgM = loadSound("backM.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

 database = firebase.database();
   
  backgM.play();
  backgM.setVolume(0.6);

  sButton = createSprite(950,450,200,60);
  sButton.addImage("Image",ButtonImg);
  sButton.scale = 0.5;
  sButton.visible = true;

  dButton = createSprite(300,450,50,10);
  dButton.addImage("Image",ButtonImg);
  dButton.scale = 0.55;
  dButton.visible = true;

  spaceShip = createSprite(500,500,50,100);
  spaceShip.addImage("Image",spacei);
  spaceShip.visible = false;

  Backbutton = createSprite(915,460,50,50);
  Backbutton.addImage("image", ButtonImg);
  Backbutton.visible = false;

  GameTitle = new title();
  GameTitle.display();

  fillForm = new Form();
  leaderboard = new Leaderboard();

  obstaclegroup = new Group();
  lasergroup = new Group();
  shootgroup = new Group();
  score = 0;

  box = createSprite(700,350,800,400);
  box.visible=false;
}


function draw() 
{
  background( backImg); 
  //Engine.update(engine);
  drawSprites();
  if(gameState === 0){
    
    sButton.visible = true;
    dButton.visible = true;
    textSize(40);
    fill("white");
    text("Do you want to be the great Space Fighter just like the X-Wing?",150,350);

    textSize(35);
    fill("white");
    text("Yes!", 915,460);

    textSize(30);
    fill("white");
    text("Directions", 230,460);
    
    //sButton.mouseClicked(sButtons);
    if(mousePressedOver(sButton)){
      gameState = 1;
      sButton.visible = false;
      dButton.visible = false;
    }

    if(mousePressedOver(dButton)){
      sButton.visible = false;
      dButton.visible = false;
      gameState = 0.1;
    }

  }
  else if (gameState === 0.1){
    background(tBgI);
    Backbutton.visible = true;
    
    if(mousePressedOver(Backbutton)){
      gameState = 1;
    }
    direction();
  }
  else if(gameState === 1){
    Backbutton.visible = false;
    form();
    textSize(30);
    fill("white");
    text("Submit",500,450);
    
  }
  else if(gameState === 2){
     fillForm.hide();

     spaceShip.visible = true;
     //box.visible=true;

    if(keyDown("RIGHT_ARROW")){
      spaceShip.x += 5;
    }
  
    if(keyDown("LEFT_ARROW")){
      spaceShip.x -= 5;
    }
  
    if(keyDown("space")){
      laserBeam();
    }
  
    if(keyDown("B")) {
      shooting();
    }
    
    textSize(20);
    fill("white");
    text("Score:",200,200);

    if(obstaclegroup.isTouching(lasergroup)){
      obstaclegroup.visible = false;
      score += 2;
    }

   if(shootgroup.isTouching(obstaclegroup)){
    obstacle.visible = false;
    score +=1;
  }
   
    metioriods();
  }
  else if(gameState === END){
 
  }

 
  
}

function laserBeam(){
  laser = createSprite(200, 200, 50,100);
  lasergroup.add(laser);
  laser.addImage(laserImg);
  laser.scale = 0.2
  laser.x = spaceShip.x;
  laser.y = spaceShip.y;
  laser.velocityY -= 5;
  laser.lifeTime = 1000;
  
}

function shooting(){
  shoot = createSprite(200, 300, 100, 50);
  shootgroup.add(shoot);
  shoot.addImage(bullet);
  shoot.scale = 0.2;
  shoot.x = spaceShip.x;
  shoot.y = spaceShip.y;
  shoot.velocityY -= 5;
  shoot.lifeTime = 1000;
  
}

function metioriods(){
  if(frameCount %80 === 0){
    obstacle = createSprite(150, 150, 50, 50);
    obstaclegroup.add(obstacle);
    obstacle.x = Math.round(random(30, 2000));
    obstacle.lifetime = 80;

    obstaclegroup.add(obstacle);

  var rand = Math.round(random(0,3));
  //console.log(rand)
  if(rand === 0){
    obstacle.addImage(rock1Img);
    obstacle.scale = 0.4;
    obstacle.velocityY = 5;
  }
  else if(rand === 1){
    obstacle.addImage(rock2Img);
    obstacle.scale = 0.3;
    obstacle.velocityY = 5;
  }
  else if(rand === 2){
    obstacle.x = 250;
    obstacle.y = Math.round(random(200, 350));
    obstacle.lifetime = 180;
     obstacle.addImage(Ufo);
     obstacle.scale = 0.4;
     obstacle.velocityX = 5;
  }
  else if(rand === 3){
    obstacle.x = 250;
    obstacle.y = Math.round(random(200, 350));
    obstacle.lifetime = 180;
     obstacle.addImage(ufo2);
     obstacle.scale = 0.4;
     obstacle.velocityX = 5;
  }
  }
  
}

function form(){
  fillForm.display();
}

function direction(){
  textSize(30);
  fill("white");
  text("*press the left arrow to move left ", 200,100);
  text("*press the right arrow to move right",200,150);
  text("*press the B for the bullets",200,200);
  text("*press the space for the laser",200,250);
  text("*be careful from the metioriods and ufos to survive",200,300);
  text("*before the life gets over collect them",200,350);
  text("*whenever you shoot or kill or destroy any ufo or metiorids your score gets increased ",200,400);
  text("to 1",210,430);
  
}
