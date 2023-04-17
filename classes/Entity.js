class Entity {
    constructor () {
        this.id = this.genUniqueId();
        this.x = 0;
        this.y = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.w = 0;
        this.h = 0;
        this.middle = {}
        this.hitBoxColor = "rgba(0,0,255,0.2)";
        this.jobSet = [];
        this.anchored = true;
    }

    update() {
        this.x = this.x + this.xVelocity;
        this.y = this.y + this.yVelocity;
        
        for(let i = 0; i < this.jobSet.length; i++){
            this[this.jobSet[i]]()
        };
    }   

    genUniqueId() {
        const dateStr = Date
          .now()
          .toString(36); // convert num to base 36 and stringify
      
        const randomStr = Math
          .random()
          .toString(36)
          .substring(2, 8); // start at index 2 to skip decimal point
      
        return `${dateStr}-${randomStr}`;
    }

    addJob(job) {
        this.jobSet.push(job)
    }

    removeJob(job){
        this.jobSet.splice(this.jobSet.indexOf(job))
    }

    setXVelocity (vel) {
        this.xVelocity = vel;
    }
    
    setYVelocity (vel) {
        this.yVelocity = vel;
    }
    getXVelocity () {
        return this.xVelocity;
    }
    setYVelocity() {
        return this.yVelocity;
    }
    setWidth (width) {
        this.w = width
        this.middle.w = width * 0.5
    }
    setHeight(height) {
        this.h = height;
        this.middle.h = height * 0.5
    }

    getNorth() {
        return this.y - this.middle.h;
    }

    getWest() {
        return this.x - this.middle.w;
    }

    getEast(){
        return this.x + this.middle.w;
    }

    getSouth() {
        return this.y + this.middle.h;
    }

    anchor() {
        this.anchored = true
        this.jobSet = this.jobset.filter(e => e === "gravity")
    }
  
    unanchor () {
        this.anchored = false
        this.jobSet.push("gravity")
    }

    drawHitbox() {
        push();
        fill(this.hitBoxColor);
        rect(this.x-this.middle.w, this.y-this.middle.h, this.w, this.h);
        noStroke();
        fill("white")
        circle(this.x, this.y, 2);
        fill("red")
        circle(this.x, this.getNorth(), 2);
        fill("blue")
        circle(this.x, this.getSouth(), 2);
        fill("green")
        circle(this.getEast(), this.y, 2);
        fill("yellow")
        circle(this.getWest(), this.y, 2);
        pop();
    }

    collisionWith(entityIndex) {
        // console.log(game.entities[entityIndex].constructor.name)
        // game.entities[entityIndex].yVelocity *= -1
        // this.yVelocity *= -1

        // if(game.entities[entityIndex].y > this.y){
        //     game.entities[entityIndex].yVelocity *= -1 
        // } else {

        // }

        // if(!this.anchored){
        //     // this.xVelocity += (this.xVelocity - game.entities[entityIndex].xVelocity) * -1
        //     this.yVelocity += (this.yVelocity - game.entities[entityIndex].yVelocity) * -1
        // }
    }

    gravity() {
        this.yVelocity += game.gravity;
    }
}