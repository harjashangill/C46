var city
var player
var zombie
var zombieSprite
var playerSprite
var zombieSpriteGroup
var bullet
var bulletGroup
var bulletSprite
var score = 0
var life = 3
var isLeftKeyActive = false


function preload(){
  city = loadImage("images/city2.jpeg")
  player = loadImage("images/player.png")
  zombie = loadAnimation("images/zombie1.png","images/zombie2.png","images/zombie3.png","images/zombie4.png")
  bullet = loadImage("images/bullet.png")

}


function setup()
{
  createCanvas(windowWidth,windowHeight);
  playerSprite = createSprite(200,200,20,20)
  playerSprite.addImage(player)
  playerSprite.debug = true
  playerSprite.setCollider("rectangle",0,0,100,200)

  zombieSpriteGroup = new Group()
  bulletGroup = new Group()
  
  edges = createEdgeSprites()
  
}


function draw() 
{
  background(city);
  drawSprites()

  if(keyDown(LEFT_ARROW)){
    playerSprite.y = playerSprite.y-5

  }
  if(keyDown(RIGHT_ARROW)){
    playerSprite.y = playerSprite.y+5

  }
  if(keyWentDown("space")){
    spawnBullet()

  }
  if(bulletGroup.isTouching(zombieSpriteGroup)){
    
    zombieSpriteGroup.destroyEach()
    bulletGroup.destroyEach()
    score += 1
  }
  if(playerSprite.collide(zombieSpriteGroup)){
   
    life= life - 1
    playerSprite.collide(edges)
    
  }
  textSize(44)
  fill("white")
  text("score: "+score,windowWidth/2,50)
  

  textSize(43)
  fill("red")
  text("lifes: "+life,100,50)
  

  spawnZombie()
}

function spawnZombie(){
  if(frameCount%200===0){
  zombieSprite = createSprite(windowWidth/2+200,200,20,20)
  zombieSprite.addAnimation("walking",zombie)
  zombieSprite.scale = 1
  zombieSprite.velocityX = -2
  zombieSprite.y = random(windowHeight/2-200,windowHeight-80)
  zombieSpriteGroup.add(zombieSprite)
  zombieSprite.debug = true
  zombieSprite.setCollider("rectangle",0,0,100,170)
  }
    

}
function spawnBullet(){
 
    bulletSprite = createSprite(playerSprite.x+100,playerSprite.y-60 ,10,10)
    bulletSprite.addImage(bullet)
    bulletSprite.scale = 0.1
    bulletSprite.velocityX = 6
    bulletGroup.add(bulletSprite)
    bulletSprite.debug = true
    bulletSprite.setCollider("rectangle",0,0,80,100)
}

