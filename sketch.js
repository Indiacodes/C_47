var player, playerImage, playerJumpImage, bg, bgimage, startPlatform, coin, coinImage;
var groupPath, groupCoin, skySprite, gameState = "startState";
var collideCount = 0;
var pressedFlag = 0;
var flag = 0;
var score = 0;

function preload(){
  bgimage = loadImage("Images/SkyBlue.jpg");
  playerImage = loadImage("Images/Slime1.png");
  playerJumpImage = loadImage("Images/Slime2.png");
  coinImage = loadImage("Images/Coin.png");
}

function setup() {
  createCanvas(displayWidth - 20,displayHeight - 132);

  skySprite = createSprite(displayWidth/1.4, displayHeight/2);
  skySprite.addImage(bgimage);
  skySprite.scale = 2;

  player = createSprite(displayWidth/3 - 250, displayHeight/2 + 200, 50, 50);
  player.addImage(playerImage);

  groupPath = new Group();
  groupCoin = new Group();

  startPlatform = createSprite(player.x, player.y + 25, 80, 10);
}

function draw() {
  background("#1460AF");

  if(gameState == "startState"){

    if(keyIsDown(32)){
      player.velocityY = -10;
      gameState = "playingState";
      
      startPlatform.destroy();
      player.addImage(playerJumpImage);
    }

    player.collide(startPlatform);

  }

  if(gameState == "playingState"){

    if(keyIsDown(32)){
      player.velocityY = -10;
      player.addImage(playerJumpImage);
    } else{
      player.addImage(playerImage);
    }

    //bg move
    skySprite.velocityX = -5;

    //bg reset
    if(skySprite.x < 0){
      skySprite.x = displayWidth/2;
    }

    //score
    for(var i = 0;i<groupCoin.maxDepth();i++){
      var coinSprite = groupCoin.get(i)

      if(coinSprite != null && player.isTouching(coinSprite)){
        coinSprite.destroy();
        score = score + 5;
      }
    }

    //Paths and destroying
    createPath();

    for(var i = 0;i<groupPath.maxDepth();i++){
      var pathSprite = groupPath.get(i);

      if(pathSprite != null && pathSprite.x < (player.x - 100)){
        pathSprite.destroy();
      }
    }

    //gravity
    player.velocityY = player.velocityY + 0.4;

  }

  //camera
  camera.position.y = player.y - 100;
  camera.position.x = player.x + 600;

  //collide paths
  player.collide(groupPath);
  
  drawSprites();

  textSize(35);
  text("Score: "+score, player.x + 900, player.y - 400);
}

function createPath(){
  var count = Math.round(random(40, 90));
  var yPos = Math.round(random(player.y - 50, player.y));

  if(frameCount%count==0){
    objPath = new Path(displayWidth + 50, yPos);
    objPath.path.velocityX = -5;
    groupPath.add(objPath.path);
    var randomCoin = Math.round(random(0,3));

    if(frameCount%randomCoin==0){
      coin = createSprite(objPath.x, objPath.y - 30, 20, 20);
      coin.velocityX = -5;
      coin.addImage(coinImage);
      coin.scale = 0.05;
      groupCoin.add(coin);
    }
  }

}