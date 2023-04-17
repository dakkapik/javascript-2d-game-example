class Box extends Entity {
    constructor(x, y, width, height, color) {
      super();
      this.color = color;
      this.x = x;
      this.y = y;
      this.setWidth(width);
      this.setHeight(height);

      this.jobSet.push("draw")
    }
    
    setColor(color) {
      this.color = color;
    }

    draw() {
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
    }

    collisionWith(){}
}