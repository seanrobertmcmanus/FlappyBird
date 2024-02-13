import { Bird } from "./bird.js";
import { Pipe } from "./pipes.js";

// Game Constants
const GAME_LOOP_INTERVAL = 20;
const FLAP_INTERVAL = 100;
// Game State

// Bird
const BIRD_START_Y = 120;
const BIRD_START_X = 220;
const LIFT = -5;
const JUMP_HEIGHT = 15;
const MAX_HEIGHT = 540;
const MAX_ROTATION = 90;

// Pipe
const PIPE_GAP = 400;
const PIPE_GEN_TIME = 2000;
const PIPE_START_X = 500;
const PIPE_BASE_Y = -200;
const PIPE_BASE_SPEED = 3;
const PIPE_SCREEN_END = -60;

// World
const GRAVITY = 0.4;

// Game constants

// Collision
const PIPE_COLLISION_END_X = 160;
const PIPE_COLLISION_START_X = 260;
const BOTTOM_PIPE_COLLISION_Y = 285;
const TOP_PIPE_COLLISION_Y = -34;

// DOM EVENT LISTENER
document.addEventListener("DOMContentLoaded", () => {
  let game = new FlappyBird();
  game.startGame();
});

// Flappy Bird Game
class FlappyBird {
  // DOM Objects
  #gameDisplayDOM;
  #birdDOM;
  #skyDOM;
  #groundDOM;

  // Game Objects
  #bird;
  // Timers
  #gameLoopTimer;
  #pipeGenTimer;
  #flapTimer;
  // Game State
  #isGameOver;
  #isCollision;
  #lastTime;

  constructor() {
    // DOM
    this.#gameDisplayDOM = document.querySelector(".game-container");
    this.#birdDOM = document.querySelector(".bird");
    this.#skyDOM = document.querySelector(".sky");
    this.#groundDOM = document.querySelector(".ground");

    // Game State
    this.#isGameOver = false;
    this.#isCollision = false;
    this.#lastTime = 0;

    // Game Objects
    // Bird
    this.#bird = new Bird(
      BIRD_START_X,
      BIRD_START_Y,
      GRAVITY,
      LIFT,
      JUMP_HEIGHT,
      MAX_HEIGHT,
      MAX_ROTATION,
      this.#birdDOM
    );
    // Bind Controls
    this.controls = this.controls.bind(this);
    // Init Controls
    document.addEventListener("keyup", this.controls); // jump on spacebar
  }

  // Start Menu

  // Game Over Menu

  // Start Game
  startGame() {
    // Start Game Loop
    this.#gameLoopTimer = setInterval(
      () => this.gameLoop(),
      GAME_LOOP_INTERVAL
    );
    // Generate Pipes
    // Bird Flap
    this.#flapTimer = setInterval(() => {
      this.birdFlap();
    }, FLAP_INTERVAL);
    // Score
    console.log("Generating pipes");
    this.#pipeGenTimer = setInterval(() => this.generatePipes(), PIPE_GEN_TIME);
  }

  // Game Loop
  gameLoop() {
    // Update Time
    this.#lastTime++;

    // Update Bird
    this.#bird.update(this.#lastTime);

    // check collision
    if (this.#bird.getPosY() <= 0) {
      this.setGameOver();
    }
  }

  // Game Over
  setGameOver() {
    this.#isGameOver = true;
    console.log("Game Over");
    // Stop Game Loop
    clearInterval(this.#gameLoopTimer);
    clearInterval(this.#pipeGenTimer);
    clearInterval(this.#flapTimer);
  }

  // Generate Pipes
  generatePipes() {
    // Create Pipe
    console.log("Creating Pipe");
    let pipe = new Pipe(
      PIPE_START_X,
      PIPE_BASE_Y,
      PIPE_GAP,
      this.#skyDOM,
      PIPE_BASE_SPEED,
      PIPE_COLLISION_END_X,
      PIPE_COLLISION_START_X,
      BOTTOM_PIPE_COLLISION_Y,
      TOP_PIPE_COLLISION_Y
    );
    pipe.draw();
    // Pipe Movement
    const movePipe = () => {
      let bird = this.#bird.getBirdPos();
      // Update Pipe Position
      if (!this.#isCollision && !this.#isGameOver) {
        pipe.update();
        if (pipe.checkCollision(bird.x, bird.y)) {
          // Set Collision
          this.#isCollision = true;
          // Set Bird Speed to 0 on collision
          this.#bird.setZeroSpeed();
          // Flash white screen on collision
        }
      }
      // Check Collision

      // Check if pipe is off screen
      if (pipe.getPosX() === PIPE_SCREEN_END) {
        pipe.delete();
        clearInterval(timerId);
      }
    };

    let timerId = setInterval(() => movePipe(), 20);
    //setTimeout(() => this.generatePipes(), PIPE_GEN_TIME);
  }

  // Bird Flap
  birdFlap() {
    if (!this.#isCollision && !this.#isGameOver) {
      this.#bird.flap();
    }
  }
  // Game Controls
  controls(e) {
    // Jump
    if (e.keyCode === 32 && !this.#isCollision && !this.#isGameOver) {
      this.#lastTime = 0;
      this.#bird.jump();
    }
  }
}
