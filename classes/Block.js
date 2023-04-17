class Block extends Entity {
    constructor(x, y, width, height, spriteName) {
      super();
      this.x = x;
      this.y = y;
      this.setWidth(width);
      this.setHeight(height);
      this.sprite = loadImage(`assets/${spriteName}.png`);

      this.jobSet.push("draw");
      this.jobSet.push("drawHitbox");
    }
    
    draw() {
        image(this.sprite, this.x-this.middle.w, this.y-this.middle.h, this.w, this.h);
    }

    collisionWith(){}
}