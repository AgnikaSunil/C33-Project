class Stone{
    constructor(x,y){
        var options ={
            'restitution':0.4,
            'friction':1.0,
            'density':1.0
        }
        this.body = Bodies.rectangle(x,y,30,80,options);
        this.width = 30;
        this.height = 129;
        this.image = loadImage("sprites/stone.png");
        World.add(world, this.body);
    }
    display(){
        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image,pos.x,pos.y,this.width,this.height);
        pop();
    }
}