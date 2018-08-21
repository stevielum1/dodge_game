const MovingObject = require("./moving_object.js");

class Bullet extends MovingObject {
  constructor(options) {
    super(options);
    this.radius = this.game.bulletRadius;
    this.vel = this.randomVec(this.game.bulletSpeed);
  }

  randomVec(length) {
    const deg = Math.PI * 2 * Math.random();
    return [Math.sin(deg) * length, Math.cos(deg) * length];
  }
}

module.exports = Bullet;
