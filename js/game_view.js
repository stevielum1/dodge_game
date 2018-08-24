const Game = require("./game.js");

const levels = require('./levels/levels.js');

class GameView {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.game = new Game(ctx, options);
    this.bindKeyHandlers();
    this.moving = {
      up: false,
      left: false,
      down: false,
      right: false,
      slowed: false,
    };
    this.playerSpeed = options.playerSpeed / 10 || 2;
    this.intervalId = 0;
    this.mode = options.mode || "sandbox";
    if (this.mode === "sandbox") {
      this.startTime = new Date().getTime();
    } else {
      this.startTime = new Date().getTime() + 10000;
    }
    this.next = false;
  }

  static nextGame(ctx, currentLevel) {
    return new GameView(ctx, levels[currentLevel + 1]);
  }

  start() {
    this.game.step();
    this.game.draw();
    this.updatePlayer();
    this.updateTime();
    this.nextLevel();
    this.intervalId = requestAnimationFrame(this.start.bind(this));
  }

  stop() {
    this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
    cancelAnimationFrame(this.intervalId);
  }

  updateTime() {
    const timer = document.getElementById("timer");
    if (this.mode === "sandbox") {
      if (this.game.gameOver === false) {
        timer.innerText = Math.round((new Date().getTime() - this.startTime)/100);
      }
    } else {
      if (this.game.gameOver === false) {
        timer.innerText = Math.round(-(new Date().getTime() - this.startTime)/100);
      }
    }
  }

  nextLevel() {
    if (this.mode === "sandbox") return;
    if (this.startTime < new Date().getTime() && this.game.gameOver === false) {
      this.next = true;
    }
  }

  bindKeyHandlers() {
    // WASD, Shift
    window.addEventListener("keydown", e => {
      switch(e.keyCode) {
        case 87:
          this.moving.up = true;
          break;
        case 65:
          this.moving.left = true;
          break;
        case 83:
          this.moving.down = true;
          break;
        case 68:
          this.moving.right = true;
          break;
        case 16:
          this.moving.slowed = true;
          break;
      }
    }, true);
    window.addEventListener("keyup", e => {
      switch(e.keyCode) {
        case 87:
          this.moving.up = false;
          break;
        case 65:
          this.moving.left = false;
          break;
        case 83:
          this.moving.down = false;
          break;
        case 68:
          this.moving.right = false;
          break;
        case 16:
          this.moving.slowed = false;
          break;
      }
    }, true);
  }

  updatePlayer() {
    const { up, left, down, right, slowed } = this.moving;
    const speed = this.playerSpeed;

    if (up && slowed) {
      this.game.player.moveControlled([0, -speed / 2]);
    } else if (up) {
      this.game.player.moveControlled([0, -speed]);
    }
    if (left && slowed) {
      this.game.player.moveControlled([-speed / 2, 0]);
    } else if (left) {
      this.game.player.moveControlled([-speed, 0]);
    }
    if (down && slowed) {
      this.game.player.moveControlled([0, speed / 2]);
    } else if (down) {
      this.game.player.moveControlled([0, speed]);
    }
    if (right && slowed) {
      this.game.player.moveControlled([speed / 2, 0]);
    } else if (right) {
      this.game.player.moveControlled([speed, 0]);
    }
  }
}

module.exports = GameView;
