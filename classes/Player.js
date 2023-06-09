class Player extends Entity {
    constructor (x, y, width, height, charName, idleSprite) {
      super();
      this.sprites = {
        idle: loadImage(idleSprite)
      }
  
      this.charName = charName;
  
      this.maxHealth = 100;
      this.health;
  
      this.currentSprite = this.sprites.idle;
      this.x = x;
      this.y = y;
      this.setWidth(width);
      this.setHeight(height);

      this.runDrag = 0.8;
      this.runSpeed = 6;
  
      this.jumpHeight = 10;
      this.jumpCount = 0;
  
      this.faceRight = true;
  
      this.damaged = false;
      this.attacking = false;
  
      this.attackTimer = 0;
      this.attackDuration = 25; 
  
      this.currentAttack;
      
      this.attackCooldown = 30;
  
      this.movement = true;
    
      this.attacks = {}
      this.attackNames = [];
  
      this.attackEntitiIndex = null;
  
      this.keys = {};
      
      this.yVelocity = 3

      this.jobSet.push("draw")
      this.jobSet.push("gravity")
      this.jobSet.push("move")
    }
  
    addHealthBar (index) {
      this.health = new HealthBar(index, 20, this.charName, this.maxHealth)
    }
  
    addMoveKeys (keys){
      Object.entries(keys).forEach(([key, value]) => {
        this.keys[key] = value;
      })
    }
  
    enableMove(settings){
      //setting to keys
        this.keys = {
          left: 65,
          right:68,
          jump:32,
          punch: 86,
          kick: 82
        }
    }
  
    disableMove(){
      Object.keys(this.keys).forEach( key => this.keys[key] = null)
    }
  
    move () {
  
      this.xVelocity = this.updateXVelocity();
      this.yVelocity = this.updateYVelocity();
      this.currentSprite = this.selectAnimation();
  
    }
  
    addAttack (w, h, keyCode, name, spritePath, 
      duration, cooldown, xKnockback, yKnockback, damage, 
      yOffset=0, xOffset=0)
      {
  
      this.sprites[name] = loadImage(spritePath);
  
      this.attacks[name] = new Attack(
        w, h, duration, 
        cooldown,xKnockback, yKnockback, 
        damage, yOffset, xOffset
        );
  
      this.keys[name] = keyCode;
      this.attackNames = Object.keys(this.attacks);
    }
  
    selectAnimation() {
      if(this.attackTimer === 0) {
        this.attackNames.forEach(name => {
          if(inputs.keyPressed.has(this.keys[name])){
            this.currentAttack = name;
            
            this.attacking = true;
            this.attackTimer ++;
            this.attackDuration = this.attacks[name].duration;
            this.attackCooldown = this.attacks[name].cooldown;
  
            return this.sprites[this.currentAttack];
          }
        })
      }
  
  
        // needs work 
      if(this.attackTimer > 0 && this.attackTimer < this.attackCooldown + this.attackDuration){
        this.attackTimer ++;
        
        if(this.attackTimer < this.attackDuration) {
          return this.sprites[this.currentAttack]
        } else {
          this.attacking = false;
          return this.sprites.idle
        }
    
      } else {
        this.attackTimer = 0;
      }
  
      return this.sprites.idle;
    }
  
    updateYVelocity() {
      if(
        inputs.keyPressed.has(this.keys.jump) &&
        this.jumpCooldownTimer === 0 &&
        this.jumpCount < 2
      ) {
  
        this.jumpCount ++;
        this.jumpCooldownTimer ++;
        return -this.jumpHeight;
  
      } else {
  
        if(this.jumpCooldownTimer > 0 && this.jumpCooldownTimer < this.jumpCooldownTime) {
          this.jumpCooldownTimer++
        } else {
          this.jumpCooldownTimer = 0;
        }
  
      }
      
      return this.yVelocity;
    }
  
    updateXVelocity() {
      if(inputs.keyPressed.has(this.keys.right)){
        this.faceRight = true;
        return this.runSpeed;
      } 
      if(inputs.keyPressed.has(this.keys.left)) {
        this.faceRight = false;
        return -this.runSpeed;
      }
  
      return this.xVelocity * this.runDrag
    }

    setSprite(sprite) {
      this.currentSprite = loadImage(sprite)
    }
  
    hideHitbox() {
      this.removeJob("drawHitBox");
    }
  
    showHitbox () {
      this.jobSet.push("drawHitbox");
    }
  
    hideMetaData() {
      this.removeJob("displayMetaData");
    }
  
    showMetaData() {
      textSize(this.metaTextSize);
      this.jobSet.push("displayMetaData")
    }
  
    displayMetaData() {
      push();
      fill("blue")
      text(`
      x: ${this.x}
      y:${this.y}
      xVel:${this.xVelocity}
      yVel:${this.yVelocity}
      jumpCount: ${this.jumpCount}
      jumpColdown: ${this.jumpCooldownTimer}
      faceRight: ${this.faceRight}
      attacking: ${this.attacking}
      attackTimer: ${this.attackTimer}`
      , game.gameWidth - 150, this.metaTextSize);
      pop();
    }
  
    draw(){
      if(this.faceRight){
        image(this.currentSprite, this.x- this.middle.w, this.y-this.middle.h)
      } else {
        push()
        scale(-1,1)
        image(this.currentSprite, - this.x -this.middle.w, this.y-this.middle.h)
        pop()
      }
      // this.health.draw();
      this.attackLogic();
    }
  
    collisionWith = cwp;
  
    attackLogic(){
      if(this.attacking){
        if(!this.attacks[this.currentAttack].active){
          this.attacks[this.currentAttack].activate();
        }
  
        if(this.faceRight) {
          this.attacks[this.currentAttack].update(this.x, this.y, this.w)
        } else {
          this.attacks[this.currentAttack].update(this.x, this.y, this.attacks[this.currentAttack].width*-1)
        }
        return 
      }
  
      if(this.currentAttack != null) {
        this.attacks[this.currentAttack].deactivate();
      }
    }
}
