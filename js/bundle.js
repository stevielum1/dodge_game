/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/bullet.js":
/*!**********************!*\
  !*** ./js/bullet.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object.js */ "./js/moving_object.js");

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


/***/ }),

/***/ "./js/entry.js":
/*!*********************!*\
  !*** ./js/entry.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(/*! ./game_view.js */ "./js/game_view.js");
const levels = __webpack_require__(/*! ./levels/levels.js */ "./js/levels/levels.js");

console.log("it's working");

let gameView;
let ctx;
let canvas;

let mode = "sandbox";
let currentLevel = 1;
let lives = 4;

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  window.addEventListener("keydown", restartGameHandler);

  document.getElementById("sandbox").addEventListener("click", sandboxOn);
  document.getElementById("story").addEventListener("click", storyOn);

  gameView = new GameView(ctx, {});
  gameView.start();
});

const sandboxOn = e => {
  mode = "sandbox";

  const elements = document.querySelectorAll("input, label");

  elements.forEach(el => {
    el.classList.remove("hidden");
  });

  restartGame();
};

const storyOn = e => {
  mode = "story";

  const elements = document.querySelectorAll("input, label");

  elements.forEach(el => {
    el.classList.add("hidden");
  });

  restartGame();
};

const restartGame = () => {
  gameView.stop();
  gameView = null;

  if (mode === "sandbox") {
    const numBullets = parseInt(document.getElementById("num-bullets").value);
    const bulletSpeed = parseInt(document.getElementById("bullet-speed").value);
    const bulletRadius = parseInt(document.getElementById("bullet-radius").value);
    const playerSpeed = parseInt(document.getElementById("player-speed").value);
    const playerRadius = parseInt(document.getElementById("player-radius").value);
    const bulletFillColor = document.getElementById("bullet-fill-color").value;
    const bulletStrokeColor = document.getElementById("bullet-stroke-color").value;
    const playerFillColor = document.getElementById("player-fill-color").value;
    const playerStrokeColor = document.getElementById("player-stroke-color").value;
    const backgroundColor = document.getElementById("background-color").value;

    canvas.style = `background: ${backgroundColor}`;

    const options = {
      numBullets,
      bulletSpeed,
      bulletRadius,
      playerSpeed,
      playerRadius,
      bulletFillColor,
      bulletStrokeColor,
      playerFillColor,
      playerStrokeColor,
      mode,
      level: 0
    };

    gameView = new GameView(ctx, options);
  } else {
    if (lives > 0) {
      lives--;
    } else {
      lives = 3;
      currentLevel = 1;
    }
    gameView = new GameView(ctx, levels[currentLevel]);
  }

  gameView.start();
};

window.setInterval(() => {
  document.getElementById("level").innerText = mode === "sandbox" ? `SANDBOX` : `LEVEL ${currentLevel}`;
  document.getElementById("lives").innerText = mode === "sandbox" ? "" : `Lives: ${lives}`;
  if (gameView.next) {
    gameView.stop();
    gameView = new GameView(ctx, levels[++currentLevel]);
    gameView.start();
  }
}, 20);

const restartGameHandler = e => {
  //R
  if (e.which === 82) {
    restartGame();
  }
};


/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Bullet = __webpack_require__(/*! ./bullet.js */ "./js/bullet.js");
const Player = __webpack_require__(/*! ./player.js */ "./js/player.js");

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


/***/ }),

/***/ "./js/game_view.js":
/*!*************************!*\
  !*** ./js/game_view.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game.js */ "./js/game.js");

const levels = __webpack_require__(/*! ./levels/levels.js */ "./js/levels/levels.js");

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


/***/ }),

/***/ "./js/levels/level_1.js":
/*!******************************!*\
  !*** ./js/levels/level_1.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 20,
  bulletSpeed: 10,
  bulletRadius: 10,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 1
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_10.js":
/*!*******************************!*\
  !*** ./js/levels/level_10.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 100,
  bulletSpeed: 10,
  bulletRadius: 15,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 10
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_11.js":
/*!*******************************!*\
  !*** ./js/levels/level_11.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 150,
  bulletSpeed: 5,
  bulletRadius: 10,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 11
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_12.js":
/*!*******************************!*\
  !*** ./js/levels/level_12.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 175,
  bulletSpeed: 5,
  bulletRadius: 10,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 12
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_13.js":
/*!*******************************!*\
  !*** ./js/levels/level_13.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 200,
  bulletSpeed: 5,
  bulletRadius: 10,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 13
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_14.js":
/*!*******************************!*\
  !*** ./js/levels/level_14.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 225,
  bulletSpeed: 5,
  bulletRadius: 10,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 14
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_15.js":
/*!*******************************!*\
  !*** ./js/levels/level_15.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 250,
  bulletSpeed: 5,
  bulletRadius: 10,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 15
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_16.js":
/*!*******************************!*\
  !*** ./js/levels/level_16.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 300,
  bulletSpeed: 3,
  bulletRadius: 5,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 16
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_17.js":
/*!*******************************!*\
  !*** ./js/levels/level_17.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 350,
  bulletSpeed: 3,
  bulletRadius: 5,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 17
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_18.js":
/*!*******************************!*\
  !*** ./js/levels/level_18.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 400,
  bulletSpeed: 3,
  bulletRadius: 5,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 18
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_19.js":
/*!*******************************!*\
  !*** ./js/levels/level_19.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 450,
  bulletSpeed: 3,
  bulletRadius: 5,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 19
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_2.js":
/*!******************************!*\
  !*** ./js/levels/level_2.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 40,
  bulletSpeed: 10,
  bulletRadius: 10,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 2
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_20.js":
/*!*******************************!*\
  !*** ./js/levels/level_20.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 500,
  bulletSpeed: 3,
  bulletRadius: 5,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 20
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_21.js":
/*!*******************************!*\
  !*** ./js/levels/level_21.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 550,
  bulletSpeed: 2,
  bulletRadius: 4,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 21
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_22.js":
/*!*******************************!*\
  !*** ./js/levels/level_22.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 600,
  bulletSpeed: 2,
  bulletRadius: 4,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 22
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_23.js":
/*!*******************************!*\
  !*** ./js/levels/level_23.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 650,
  bulletSpeed: 2,
  bulletRadius: 4,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 23
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_24.js":
/*!*******************************!*\
  !*** ./js/levels/level_24.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 700,
  bulletSpeed: 2,
  bulletRadius: 4,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 24
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_25.js":
/*!*******************************!*\
  !*** ./js/levels/level_25.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 750,
  bulletSpeed: 2,
  bulletRadius: 4,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 25
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_26.js":
/*!*******************************!*\
  !*** ./js/levels/level_26.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 7,
  bulletSpeed: 40,
  bulletRadius: 20,
  playerSpeed: 40,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 26
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_27.js":
/*!*******************************!*\
  !*** ./js/levels/level_27.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 9,
  bulletSpeed: 40,
  bulletRadius: 20,
  playerSpeed: 40,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 27
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_28.js":
/*!*******************************!*\
  !*** ./js/levels/level_28.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 11,
  bulletSpeed: 40,
  bulletRadius: 30,
  playerSpeed: 40,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 28
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_29.js":
/*!*******************************!*\
  !*** ./js/levels/level_29.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 13,
  bulletSpeed: 40,
  bulletRadius: 40,
  playerSpeed: 40,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 29
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_3.js":
/*!******************************!*\
  !*** ./js/levels/level_3.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 60,
  bulletSpeed: 10,
  bulletRadius: 10,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 3
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_30.js":
/*!*******************************!*\
  !*** ./js/levels/level_30.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 15,
  bulletSpeed: 40,
  bulletRadius: 50,
  playerSpeed: 40,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 30
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_4.js":
/*!******************************!*\
  !*** ./js/levels/level_4.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 80,
  bulletSpeed: 10,
  bulletRadius: 10,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 4
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_5.js":
/*!******************************!*\
  !*** ./js/levels/level_5.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 100,
  bulletSpeed: 10,
  bulletRadius: 10,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 5
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_6.js":
/*!******************************!*\
  !*** ./js/levels/level_6.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 60,
  bulletSpeed: 10,
  bulletRadius: 15,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 6
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_7.js":
/*!******************************!*\
  !*** ./js/levels/level_7.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 70,
  bulletSpeed: 10,
  bulletRadius: 15,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 7
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_8.js":
/*!******************************!*\
  !*** ./js/levels/level_8.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 80,
  bulletSpeed: 10,
  bulletRadius: 15,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 8
};

module.exports = options;


/***/ }),

/***/ "./js/levels/level_9.js":
/*!******************************!*\
  !*** ./js/levels/level_9.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const options = {
  numBullets: 90,
  bulletSpeed: 10,
  bulletRadius: 15,
  playerSpeed: 20,
  playerRadius: 3,
  bulletFillColor: "#ff0000",
  bulletStrokeColor: "#000000",
  playerFillColor: "#0000ff",
  playerStrokeColor: "#000000",
  mode: "story",
  level: 9
};

module.exports = options;


/***/ }),

/***/ "./js/levels/levels.js":
/*!*****************************!*\
  !*** ./js/levels/levels.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const level1 = __webpack_require__(/*! ./level_1.js */ "./js/levels/level_1.js");
const level2 = __webpack_require__(/*! ./level_2.js */ "./js/levels/level_2.js");
const level3 = __webpack_require__(/*! ./level_3.js */ "./js/levels/level_3.js");
const level4 = __webpack_require__(/*! ./level_4.js */ "./js/levels/level_4.js");
const level5 = __webpack_require__(/*! ./level_5.js */ "./js/levels/level_5.js");
const level6 = __webpack_require__(/*! ./level_6.js */ "./js/levels/level_6.js");
const level7 = __webpack_require__(/*! ./level_7.js */ "./js/levels/level_7.js");
const level8 = __webpack_require__(/*! ./level_8.js */ "./js/levels/level_8.js");
const level9 = __webpack_require__(/*! ./level_9.js */ "./js/levels/level_9.js");
const level10 = __webpack_require__(/*! ./level_10.js */ "./js/levels/level_10.js");
const level11 = __webpack_require__(/*! ./level_11.js */ "./js/levels/level_11.js");
const level12 = __webpack_require__(/*! ./level_12.js */ "./js/levels/level_12.js");
const level13 = __webpack_require__(/*! ./level_13.js */ "./js/levels/level_13.js");
const level14 = __webpack_require__(/*! ./level_14.js */ "./js/levels/level_14.js");
const level15 = __webpack_require__(/*! ./level_15.js */ "./js/levels/level_15.js");
const level16 = __webpack_require__(/*! ./level_16.js */ "./js/levels/level_16.js");
const level17 = __webpack_require__(/*! ./level_17.js */ "./js/levels/level_17.js");
const level18 = __webpack_require__(/*! ./level_18.js */ "./js/levels/level_18.js");
const level19 = __webpack_require__(/*! ./level_19.js */ "./js/levels/level_19.js");
const level20 = __webpack_require__(/*! ./level_20.js */ "./js/levels/level_20.js");
const level21 = __webpack_require__(/*! ./level_21.js */ "./js/levels/level_21.js");
const level22 = __webpack_require__(/*! ./level_22.js */ "./js/levels/level_22.js");
const level23 = __webpack_require__(/*! ./level_23.js */ "./js/levels/level_23.js");
const level24 = __webpack_require__(/*! ./level_24.js */ "./js/levels/level_24.js");
const level25 = __webpack_require__(/*! ./level_25.js */ "./js/levels/level_25.js");
const level26 = __webpack_require__(/*! ./level_26.js */ "./js/levels/level_26.js");
const level27 = __webpack_require__(/*! ./level_27.js */ "./js/levels/level_27.js");
const level28 = __webpack_require__(/*! ./level_28.js */ "./js/levels/level_28.js");
const level29 = __webpack_require__(/*! ./level_29.js */ "./js/levels/level_29.js");
const level30 = __webpack_require__(/*! ./level_30.js */ "./js/levels/level_30.js");

module.exports = {
  1: level1,
  2: level2,
  3: level3,
  4: level4,
  5: level5,
  6: level6,
  7: level7,
  8: level8,
  9: level9,
  10: level10,
  11: level11,
  12: level12,
  13: level13,
  14: level14,
  15: level15,
  16: level16,
  17: level17,
  18: level18,
  19: level19,
  20: level20,
  21: level21,
  22: level22,
  23: level23,
  24: level24,
  25: level25,
  26: level26,
  27: level27,
  28: level28,
  29: level29,
  30: level30,
};


/***/ }),

/***/ "./js/moving_object.js":
/*!*****************************!*\
  !*** ./js/moving_object.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
    const xDist = this.pos[0] - other.pos[0];
    const yDist = this.pos[1] - other.pos[1];
    const dist = (xDist * xDist) + (yDist * yDist);
    if (dist <= (this.radius + other.radius) * (this.radius + other.radius)) {
      return true;
    }
    return false;
  }
}

module.exports = MovingObject;


/***/ }),

/***/ "./js/player.js":
/*!**********************!*\
  !*** ./js/player.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object.js */ "./js/moving_object.js");

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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map