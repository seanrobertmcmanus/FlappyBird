// document.addEventListener("DOMContentLoaded", () => {
//   // Bird object
//   const bird = document.querySelector(".bird");
//   // Game container
//   const gameDisplay = document.querySelector(".game-container");
//   // Ground
//   const ground = document.querySelector(".ground");
//   // Sky
//   const sky = document.querySelector(".sky");
//   // Game State Logic
//   let isGameOver = false;
//   let isCollision = false;
//   // Game Logic
//   // Bird
//   let vertSpeed = 0;
//   let birdPosY = BIRDSTARTY;
//   let birdPosX = BIRDSTARTX;
//   let birdRotation = 0;
//   // World
//   let gravity = GRAVITY;
//   let lastTime = 0;

//   // Game Init
//   function startGame() {
//     lastTime++;
//     isGameOver = false;

//     // Bird Fall Logic
//     vertSpeed = Number(
//       (vertSpeed + (gravity + (gravity * lastTime) / 1000)).toFixed(2) // Add gravity and acceleration to bird falling
//     );
//     birdPosY -= vertSpeed;
//     // Check for ground collision
//     if (birdPosY <= 0) {
//       birdPosY = 0; // Set bird to ground
//       gameOver(); // Trigger Game Over
//     }

//     // Rotate bird based on vertSpeed
//     birdRotation = Math.min(90, vertSpeed * 7);
//     console.log(birdRotation);
//     bird.style.transform = `rotate(${birdRotation}deg)`;

//     // Update bird position
//     bird.style.bottom = birdPosY + "px";
//     bird.style.left = birdPosX + "px";

//     // Stop game timer if game over
//     if (isGameOver && birdPosY <= 0) {
//       console.log("Game Over");
//       clearInterval(timerId);
//     }
//   }

//   // Stop Game
//   function gameOver() {
//     //document.removeEventListener("keyup", controls);
//     isGameOver = true;
//   }
//   // Game Logic
//   // Jump
//   function jump() {
//     vertSpeed = JUMP_SPEED;
//     birdPosY += JUMP_HEIGHT;
//     if (birdPosY >= MAX_HEIGHT) {
//       birdPosY = MAX_HEIGHT;
//     }
//     lastTime = 0;
//     bird.style.bottom = birdPosY + "px";
//     console.log(birdPosY);
//   }

//   function checkCollision(pipePosX, pipePosY) {
//     if (
//       // Check collison in range of pipe
//       (pipePosX > PIPE_COLLISION_END_X &&
//         pipePosX < PIPE_COLLISION_START_X &&
//         // Check Bottom pip collision
//         (birdPosY < pipePosY + BOTTOM_PIPE_COLLISION_Y ||
//           // Check Top pipe collision
//           birdPosY > pipePosY + GAP + TOP_PIPE_COLLISION_Y)) ||
//       birdPosY <= 0
//     ) {
//       isCollision = true;
//       return true;
//     }
//     return false;
//   }

//   // Controls
//   function controls(e) {
//     // Jump
//     if (e.keyCode === 32 && !isGameOver) {
//       jump();
//     }
//   }

//   // Map generation
//   function generateObstacle() {
//     let pipePosX = PIPE_START_X;
//     let pipePosY = PIPE_BASE_Y + Math.random() * 120;

//     // Create Top and bottom pipes
//     const obstacle = document.createElement("div");
//     const topObstacle = document.createElement("div");

//     // Check if game is over
//     if (!isGameOver) {
//       obstacle.classList.add("obstacle");
//       topObstacle.classList.add("topObstacle");
//     }

//     // Append to game container and set position
//     sky.appendChild(obstacle);
//     sky.appendChild(topObstacle);
//     obstacle.style.left = pipePosX + "px";
//     topObstacle.style.left = pipePosX + "px";
//     obstacle.style.bottom = pipePosY + "px";
//     topObstacle.style.bottom = pipePosY + GAP + "px";

//     // Pipe logic
//     function moveObstacle() {
//       // Move pipe
//       pipePosX -= 2;
//       obstacle.style.left = pipePosX + "px";
//       topObstacle.style.left = pipePosX + "px";
//       // Remove pipe when off screen
//       if (pipePosX === -60) {
//         clearInterval(timerId);
//         gameDisplay.removeChild(obstacle);
//         gameDisplay.removeChild(topObstacle);
//       }

//       // Check for collision
//       if (
//         // Check pipe collision
//         checkCollision(pipePosX, pipePosY) ||
//         // Check Ground collision
//         birdPosY <= 0 ||
//         isGameOver
//       ) {
//         gameOver();
//         clearInterval(timerId);
//       }
//     }
//     let timerId = setInterval(moveObstacle, 20);
//     //setTimeout(generateObstacle, PIPE_GEN_TIME);
//   }

//   // Key binding logic
//   document.addEventListener("keyup", controls); // jump on spacebar
//   generateObstacle();
//   // Game Loop
//   let timerId = setInterval(startGame, 20);
// });