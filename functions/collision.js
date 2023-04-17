function collision (subject) {
    for(let target = subject + 1; target < this.entityIds.length; target++){
       
      let t = this.entityIds[target];
      let s = this.entityIds[subject];

      if(
        this.entities[s].getWest() < this.entities[t].getEast() &&
        this.entities[s].getEast() > this.entities[t].getWest() &&
        this.entities[s].getNorth() < this.entities[t].getSouth() &&
        this.entities[s].getSouth() > this.entities[t].getNorth()
        ) {
          this.entities[s].collisionWith(t);
          this.entities[t].collisionWith(s);
      }
    }
}

//collision with player

function cwp (entitieIndex) {
  let obj = game.entities[entitieIndex];
  let restitution = 0.2;
  // this.jumpCount = 0;
  let vCollision = {x: obj.x - this.x, y: obj.y - this.y}
  let distance = Math.sqrt((obj.x-this.x)*(obj.x-this.x) + (obj.y-this.y)*(obj.y-this.y));
  // let vCollisionNorm = {x: vCollision.x/distance, y: vCollision.y/distance};
  // let vRelativeVelocity = {x: obj.xVelocity - this.xVelocity, y: obj.yVelocity - this.yVelocity}
  // let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

  switch(obj.constructor.name){
    case "Block":  
        if(Math.abs(this.xVelocity) > this.runSpeed/2){
          if (obj.getWest() > this.x){
            this.xVelocity = Math.abs(this.xVelocity) * restitution;
            this.x = this.x - obj.middle.w;
          } else if(obj.getEast() < this.x) {
            this.xVelocity = -Math.abs(this.xVelocity) * restitution;
            this.x = this.x + obj.middle.w;
          }
        }

        if(this.yVelocity > 0){
          if(this.getNorth() < obj.getSouth()){
            this.jumpCount = 0;
            this.yVelocity = Math.abs(this.yVelocity) * restitution;
            this.y = obj.y - (this.middle.h + obj.middle.h)
          }
          
        } else if (this.yVelocity > -this.jumpHeight){
          if(this.getSouth() > obj.getNorth()) {
            this.yVelocity = -Math.abs(this.yVelocity) * restitution;  
            this.y = obj.y + (this.middle.h + obj.middle.h) + 2;
          }
        }
      break;

    case "Attack" :
      let vCollision = {x: obj.x - this.x, y: obj.y - this.y}

      let distance = Math.sqrt((obj.x-this.x)*(obj.x-this.x) + (obj.y-this.y)*(obj.y-this.y));
      
      let vCollisionNorm = {x: vCollision.x/distance, y: vCollision.y/distance};

      let vRelativeVelocity = {x: obj.xVelocity - this.xVelocity, y: obj.yVelocity - this.yVelocity}

      let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

      this.xVelocity -= (speed * vCollisionNorm.x);
      this.yVelocity -= (speed * vCollisionNorm.y);
      obj.xVelocity += (speed * vCollisionNorm.x);
      obj.yVelocity += (speed * vCollisionNorm.y);
      
      if(obj.x < this.x){
        this.xVelocity = obj.xKnockback;
        this.yVelocity = -obj.yKnockback;
      } else {
        this.xVelocity = -obj.xKnockback;
        // this.yVelocity = obj.yKnockback;
      }

      if(!obj.hit) {
        this.health.reduce(obj.damage);
        obj.hit = true;
      }
      
      push()
      stroke('red')
      // line(this.x,this.y, this.x + vCollisionNorm.x + 10, this.y+vCollisionNorm.y + 10)
      line(this.x,this.y, this.x + vCollision.x , this.y+vCollision.y)
      // line(this.x,this.y, this.x + distance, this.y)
      // line(this.x,this.y, this.x, this.y + distance)
      pop()
      break;
    default :
      console.log("Player to:", obj.constructor.name )
    break;
  }
  

}