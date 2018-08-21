const MovingObject = require('./moving_object.js');

class Player extends MovingObject {
  constructor(options) {
    super(options);
    this.radius = options.radius || 3;
    this.vel = [0, 0];
  }

  moveControlled(impulse) {
    this.pos[0] += impulse[0];
    this.pos[1] += impulse[1];
  }
}

module.exports = Player;
