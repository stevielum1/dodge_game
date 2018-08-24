const GameView = require("./game_view.js");
const levels = require("./levels/levels.js");

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
