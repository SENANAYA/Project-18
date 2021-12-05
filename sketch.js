//GameStates
var balloons = [];
var arrows = [];
var Play = 1;
var End = 0;
var GS = Play;


//Objects
var bow , arrow,  background;

//Images
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;

//Groups
var AGroup, RBGroup, GBGroup, PBGroup, BBGroup ;
 
//arrow delay
 var y = 380+110;
var z = 380;

var Score=0;

var difficulty = 0;
var pastscore =0;
var s=5;
var SB = 0;
var MSB =0;
var MMSB=0;
var Ram = 1;
var Mar = 1;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  
  red_balloonImage = loadImage("red_balloon0.png");
 green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
}



function setup() {
  createCanvas(400, 400);
  
 
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage);
 // bow.debug=true;
  //bow.setCollider()
  bow.scale = 1;
 
  //balloons and arrows groups
  AGroup = new Group();
  RBGroup = new Group();
  BBGroup = new Group();
  PBGroup = new Group();
  GBGroup = new Group();

  
}

function draw() {
 background(0);
  
   if (GS === Play){
  
 // moving ground
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY;
  
  
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
     
  }
  
    
  //arrow delay
  if (z<bow.x){
    z=z-5;
  }
  
  //creating continous balloons
  var select_balloon = Math.round(random(1,4));
    while(SB === select_balloon || MSB ===select_balloon || MMSB === select_balloon){
         select_balloon = Math.round(random(1,4));
    }
   
     if (SB === select_balloon){
       textSize (20);
  fill("yellow")
  text ("SCORE: " + Score,200,20)
 // console.log(select_balloon);
     }
    

     
  if (World.frameCount % (100-difficulty) == 0) {
    
    switch(select_balloon){
      case 1: redBalloon();
         MMSB = MSB;
        MSB = SB;
        SB = select_balloon;
        break;
          case 2: greenBalloon();
         MMSB = MSB;
        MSB = SB;
        SB = select_balloon;
        break;
          case 3: blueBalloon();
        MMSB = MSB;
        MSB = SB;
        SB = select_balloon;
        break;
          case 4: pinkBalloon();
        MMSB = MSB;
        MSB = SB;
        SB = select_balloon;
        break;
    }
  }

 // destroying balloons
  
       
       for(let ballo of balloons){
       if (RBGroup.isTouching(AGroup)||BBGroup.isTouching(AGroup)||PBGroup.isTouching(AGroup)||GBGroup.isTouching(AGroup)){
         var r =0;
         while(r<arrows.length){
     if (ballo.isTouching(arrows[r])){
       
      if (AGroup.isTouching(RBGroup)){
       
       Score = Score +1
     }
     if (AGroup.isTouching(BBGroup)){
       
       Score = Score +2
     }
     if (AGroup.isTouching(PBGroup)){
      
       Score = Score +3
     }
     if (AGroup.isTouching(GBGroup)){
       
       Score = Score +4
     }
       
       
       arrows[r].destroy();
       
       ballo.destroy();
    
        
       arrows.splice(r);
       
       
       
     
    
  }
         r++   
     }
          
     }
    
       }
         
     if (balloons.length>20){
       balloons.splice(0,1)
     }
          
     //difficulty setting;
     if (Score/s  > Mar && Score> pastscore && difficulty<80){
       if (difficulty <96){
       difficulty = difficulty+4;
         Mar ++;
       }
       else {
         difficulty = difficulty+3;
       }
     }
      
     if (Score/20 > Ram && Score> pastscore && s>1){
       s --;
       Ram++;
     }
     
     pastscore = Score;
     
     //Ending
      if (bow.isTouching(RBGroup)){
       GS =End;
     }
     if (bow.isTouching(BBGroup)){
       GS =End;
     }
     if (bow.isTouching(PBGroup)){
       GS =End;
     }
     if (bow.isTouching(GBGroup)){
       GS =End;
     }
          }     
   drawSprites(); 
  
  if (GS === End){
  scene.velocityX = 0;
  AGroup.setVelocityXEach(0);
  RBGroup.setVelocityXEach(0);
  BBGroup.setVelocityXEach(0);
  PBGroup.setVelocityXEach(0);
  GBGroup.setVelocityXEach(0);

     textSize (20);
  fill("yellow")
  text ("Game Over  " ,160,200)
    text ("Your SCORE: " + Score,140,240)
  
     
  }
 
  
  textSize (20);
  fill("yellow")
  text ("SCORE: " + Score,170,20)
  
 // console.log(balloons.length);
  
 
}


// Creating  arrows for bow
 function createArrow() {
   
  if(z<y-100){
   var arrow = createSprite(100, 100, 60, 10);
     
  arrow.addImage(arrowImage);
    //arrow.debug=true;
    arrow.setCollider("rectangle",0,0,220,20);
  arrow.x = 360;
    
  // arrow delay  
    y =arrow.x
    z = arrow.x
    
  arrow.y=bow.y;  
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
    arrows.push(arrow);
//adding arrows in the group
    AGroup.add(arrow);
    
  }  
 } 


function redBalloon() {
  
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  //red.debug=true;
   //red.setCollider("rectangle",0,0,400, 400);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  balloons.push(red)
  //Group adding
  RBGroup.add(red);
  
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
 // blue.debug=true;
  // blue.setCollider("rectangle",0,0,100, 200);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  balloons.push(blue)
  //Group adding
 BBGroup.add(blue);

}

function greenBalloon() {
   var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
 // green.debug=true;
   //green.setCollider("rectangle",0,0,100, 200);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
   balloons.push(green)
  //Group adding
  GBGroup.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
 // pink.debug=true;
  pink.setCollider("rectangle",0,-10,25, 45);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1.2;
  balloons.push(pink)
   
  //Group adding
  PBGroup.add(pink);
}
