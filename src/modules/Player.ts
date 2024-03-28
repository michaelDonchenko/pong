import {Game} from "./Game";
import {Utils} from "./Utils";

interface Args {
  game: Game;
}

export class Player {
  public game: Game;
  public position = {
    x: 20,
    y: 20,
  };
  public width = 10;
  public height = 100;
  public speed = 6;
  public pressedKeys = new Set<string>([]);

  constructor({game}: Args) {
    this.game = game;

    document.addEventListener("keydown", (e) => {
      if (e.key === "w" || e.key === "s") {
        this.pressedKeys.add(e.key);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "w" || e.key === "s") {
        this.pressedKeys.delete(e.key);
      }
    });
  }

  update() {
    if (this.pressedKeys.has("w")) {
      if (!this.outOfUpperBound()) {
        this.position.y -= this.speed;
      }
    }
    if (this.pressedKeys.has("s")) {
      if (!this.outOfLoweBound()) {
        this.position.y += this.speed;
      }
    }

    if (
      Utils.circleRectangleCollision(
        this.game.ball.position.x,
        this.game.ball.position.y,
        this.game.ball.ballRadius,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    ) {
      const {velocityX, velocityY} = Utils.applyCollisionForce(this.game.ball, this);
      this.game.ball.velocity.x = velocityX;
      this.game.ball.velocity.y = velocityY;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "white";

    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  outOfUpperBound() {
    if (this.position.y < 0) {
      return true;
    }
  }

  outOfLoweBound() {
    if (this.position.y + this.height > this.game.canvas.height) {
      return true;
    }
  }
}
