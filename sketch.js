var bg, bgimg, boy, boyimg;
var invisibleGround;
var rock, rockGroup;
var rockImg;
var gameState="play"
var gameover, gameoverimage, restart, restartimage
var boystill

function preload() {

  bgimg = loadImage('images/Bg.jpg');
  boyimg = loadAnimation('images/12.png','images/11.png','images/10.png','images/9.png','images/8.png','images/7.png','images/6.png','images/5.png','images/4.png','images/3.png','images/2.png','images/1.png');
  rockImg = loadImage('images/Rock.png')
  gameoverimage=loadImage("images/gameOver.png")
  restartimage=loadImage("images/restart.png")
  boystill=loadImage("images/1.png")
}

function setup() {

  createCanvas(1000,600)

  bg = createSprite(500,300,1000,600);
  bg.addImage(bgimg);
  bg.scale = 2.2;
  bg.velocityX = -6;

  boy = createSprite(200,540,10,10);
  boy.addAnimation('cycle',boyimg);

  invisibleGround=createSprite(300, 580, 1500, 10)
  invisibleGround.visible=false

  rockGroup = new Group();
  gameover = createSprite(500,250,50,50)
  gameover.addImage(gameoverimage)
  gameover.visible=false

  restart = createSprite(500,350,50,50)
  restart.addImage(restartimage)
  restart.visible=false
}

function draw() {

  background('black');

if(gameState==="play"){
  
  if (bg.x < 500) {
    bg.x = bg.width;
  }
  bg.velocityX=-6
  if(keyDown('space') && boy.y>500) {
    boy.velocityY = -15;
  }
  boy.velocityY += 0.8;
  spwanObstacles();

  if(boy.isTouching(rockGroup)){
    gameState="end"
  }
}

if(gameState==="end"){
  invisibleGround.velocityX = 0;
  bg.velocityX=0
  boy.velocityY = 0;
  boy.addAnimation("cycle",boystill)
  rockGroup.setVelocityXEach(0);
  gameover.visible=true
  restart.visible=true
  if(mousePressedOver(restart)) {
    reset();
  }
}

  boy.collide(invisibleGround)
  drawSprites();

}

function reset(){
  gameState = "play";
  gameover.visible = false;
  restart.visible = false;
  
  rockGroup.destroyEach();
  
  boy.addAnimation("cycle",boyimg);
}

function spwanObstacles() {
  if(frameCount%130===0) {
    rock = createSprite(1100,invisibleGround.y-30,20,20);
    rock.addImage(rockImg);
    rock.scale = 0.3;
    rock.velocityX = -7;
    rock.lifetime = 300;
    rockGroup.add(rock)
  }

}