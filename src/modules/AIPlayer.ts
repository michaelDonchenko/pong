import {Game} from "./Game";
import {Utils} from "./Utils";

interface Args {
  game: Game;
}

export class AIPlayer {
  public game: Game;
  public position = {
    x: 0,
    y: 20,
  };
  public width = 10;
  public height = 100;
  public speed = 2;
  public currentBallX: number;

  constructor({game}: Args) {
    this.game = game;
    this.position.x = this.game.canvas.width - 20 - this.width;
    this.currentBallX = this.game.ball?.velocity.x;
  }

  update() {
    this.followTheBall();

    if (this.currentBallX !== this.game.ball.velocity.x) {
      this.speed = Math.random() * 2 + 2;
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

  followTheBall() {
    const paddleMiddle = this.position.y + this.height / 2;
    const target = this.game.ball.position.y + this.game.ball.ballRadius;

    this.applyMovement(Math.round(paddleMiddle), Math.round(target));
  }

  applyMovement(paddleMiddle: number, target: number) {
    if (paddleMiddle > target) {
      if (this.outOfUpperBound()) {
        return;
      }
      if (paddleMiddle - target < this.speed) {
        return (this.position.y -= 1);
      }
      return (this.position.y -= this.speed);
    } else if (paddleMiddle < target) {
      if (this.outOfLoweBound()) {
        return;
      }
      if (Math.abs(paddleMiddle - target) < this.speed) {
        return (this.position.y += 1);
      }
      return (this.position.y += this.speed);
    }
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
