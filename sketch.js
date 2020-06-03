const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var platform,ground;
var box1,box2,box3,box4,box5,box6,box7;
var log1,log2,log3,log4;
var stone1,stone2,stone3,stone4,stone5,stone6,stone7,stone8;
var me,friend1,friend2,friend3,friend4;
var slingshot;

var gameState = "onSling";
var bg = "sprites/day.jpg";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    me = new Me(200,50);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    friend1 = new Friend(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    friend2 = new Friend(810, 220);
    log2 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log3 = new Log(760,120,150, PI/7);
    log4 = new Log(870,120,150, -PI/7);
   
    box6 = new Box(600,320,80,80);
    stone1 = new Stone(620,260);
    stone2 = new Stone(580,260);
    stone3 = new Stone(620,180);
    stone4 = new Stone(580,180);
    friend3 = new Friend(600,120);

    box7 = new Box(1020,320,80,80);
    stone5 = new Stone(1040,260);
    stone6 = new Stone(1000,260);
    stone7 = new Stone(1040,180);
    stone8 = new Stone(1000,180);
    friend4 = new Friend(1020,120);

    slingshot = new SlingShot(me.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);

    //text(mouseX+","+mouseY,400,300);
    Engine.update(engine);
   
    noStroke();
    textSize(35);
    fill("#9999FF");
    text("Score : " + score, 1000, 50);

    platform.display();
    ground.display();

    me.display();

    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    box6.display();
    box7.display();
  
    log1.display();
    log2.display();
    log3.display();
    log4.display();

    friend1.display();
    friend1.score();

    friend2.display();
    friend2.score();

    friend3.display();
    friend3.score();

    friend4.display();
    friend4.score();

    stone1.display();
    stone2.display();
    stone3.display();
    stone4.display();
    stone5.display();
    stone6.display();
    stone7.display();
    stone8.display();

    slingshot.display(); 
}

function mouseDragged(){
    Matter.Body.setPosition(me.body, {x: mouseX , y: mouseY});
}

function mouseReleased(){
    slingshot.fly();
}

function keyPressed(){
    if(keyCode === 32 && me.body.speed<1){
       me.trajectory = [];
       Matter.Body.setPosition(me.body,{x:200 ,y:50});
       slingshot.attach(me.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=18){
        bg = "sprites/day.jpg";
    }
    else{
        bg = "sprites/night.jpg";
    }
    backgroundImg = loadImage(bg);
}

