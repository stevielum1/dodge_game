class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.fillColor = options.fillColor;
    this.strokeColor = options.strokeColor;
    this.game = options.game;
  }

  draw(ctx) {
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();

    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  move() {
    const x = this.pos[0] + this.vel[0];
    const y = this.pos[1] + this.vel[1];
    const newPos = this.game.wrap([x, y], this);
    this.pos[0] = newPos[0];
    this.pos[1] = newPos[1];
  }

  isCollidedWith(other) {
    const xDist = (this.pos[0] - other.pos[0]) * (this.pos[0] - other.pos[0]);
    const yDist = (this.pos[1] - other.pos[1]) * (this.pos[1] - other.pos[1]);
    const dist = (xDist + yDist) * (xDist + yDist);
    if (dist < (this.radius + other.radius) * (this.radius + other.radius)) {
      return true;
    }
    return false;
  }
}

module.exports = MovingObject;
