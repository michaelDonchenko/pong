import {Game} from "./modules/Game";
import "./style.css";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = 800;
canvas.height = 500;

const game = new Game(canvas, context);

function gameLoop() {
  context?.clearRect(0, 0, canvas.width, canvas.height);

  // Update game logic
  game.update();

  // Draw game objects
  game.draw();

  // Call the game loop again
  requestAnimationFrame(gameLoop);
}

gameLoop();
