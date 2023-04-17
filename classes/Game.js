class Game{
    constructor (width, height) {
      this.startTime = Date.now();
      this.background = loadImage("./assets/blank-background.png");
      this.gScreen = {width, height};
      this.gravity = 0.3;
      this.time = 0;
      this.crosshair = false;
      this.entities = {};
      this.entityIds = [];
      this.playerIds = [];
    }
  
    addEntity ( entity ) {
      this.entities[entity.id] = entity;
      this.entityIds.push(entity.id);
    }
  
    removeEntity ( id ) {
      this.entityIds.splice(this.entityIds.indexOf(id), 1);
    }

    addBlock (x, y, width, height, spriteName) {
      let block = new Block(x, y, width, height, spriteName);
      this.addEntity(block);
      return block;
    }

    addBox (x, y, width, height) {
      let box = new Box(x, y, width, height);
      this.addEntity(box);
      return box;
    }
    
    addPlayer (x, y, width, height, charName, spriteName) {
      let player = new Player(x, y, width, height, charName, spriteName)
      this.playerIds.push(player.id);
      this.addEntity(player);
      return player;
    }
    
    update() {
      this.time = Date.now() - this.startDate;
      this.drawBackground();
      this.entityIds.forEach((id, index) => {
        this.entities[id].update();
        this.collision(index)
      })
      if(this.crosshair){
          this.drawCrossHair();
      }
    }
  
    drawBackground(){
      image(this.background, 0,0,this.gScreen.width, this.gScreen.height);
    }
    
    collision = collision
  }
  