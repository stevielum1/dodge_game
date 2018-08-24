const Bullet = require("./bullet.js");
const Player = require('./player.js');

class Game {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.numBullets = options.numBullets || 100;
    this.bulletSpeed = options.bulletSpeed / 10 || 1;
    this.bulletRadius = options.bulletRadius || 10;
    this.bulletFillColor = options.bulletFillColor || "#ff0000";
    this.bulletStrokeColor = options.bulletStrokeColor || "#000000";
    this.playerFillColor = options.playerFillColor || "#0000ff";
    this.playerStrokeColor = options.playerStrokeColor || "#000000";
    this.bullets = [];
    this.addBullets();
    this.player = new Player({
      pos: [this.ctx.canvas.width/2, this.ctx.canvas.height/2],
      game: this,
      radius: options.playerRadius,
      fillColor: this.playerFillColor,
      strokeColor: this.playerStrokeColor
    });
    this.gameOver = false;
    this.startTime = new Date().getTime();
  }

  addBullets() {
    for (let i = 0; i < this.numBullets; i++) {
      const bullet = new Bullet({
        pos: this.randomPosition(),
        game: this,
        fillColor: this.bulletFillColor,
        strokeColor: this.bulletStrokeColor
      });
      this.bullets.push(bullet);
    }
  }

  randomPosition() {
    const xPos = Math.floor( Math.random() * this.ctx.canvas.width );
    const yPos = Math.floor( Math.random() * this.ctx.canvas.height );
    return [xPos, yPos];
  }

  step() {
    this.moveObjects();
    this.checkCollisions();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.allObjects().forEach(object => {
      object.draw(this.ctx);
    });
  }

  wrap(pos, obj) {
    let [xPos, yPos] = [pos[0], pos[1]];

    if (xPos - obj.radius > this.ctx.canvas.width) {
      xPos = 0 - obj.radius;
    } else if (xPos + obj.radius <= 0) {
      xPos = this.ctx.canvas.width + obj.radius;
    }

    if (yPos - obj.radius > this.ctx.canvas.height) {
      yPos = 0 - obj.radius;
    } else if (yPos + obj.radius <= 0) {
      yPos = this.ctx.canvas.height + obj.radius;
    }

    return [xPos, yPos];
  }

  moveObjects() {
    this.allObjects().forEach(object => {
      object.move();
    });
  }

  checkCollisions() {
    const bullets = this.bullets;
    const playerInvis = new Date().getTime() - this.startTime < 2000 ? true : false;
    for (let i = 0; i < bullets.length; i++) {
      if (bullets[i].isCollidedWith(this.player) && !playerInvis) {
        this.gameOver = true;
      }
    }
  }

  allObjects() {
    if (this.gameOver) {
      return this.bullets;
    }
    return this.bullets.concat([this.player]);
  }
}

module.exports = Game;
