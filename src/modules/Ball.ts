import {Game} from "./Game";

interface Args {
  game: Game;
}

export class Ball {
  public game: Game;
  public readonly ballRadius = 10;
  public position;

  public velocity = {
    x: 8,
    y: 0,
  };

  constructor({game}: Args) {
    this.game = game;

    this.position = {
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height / 2,
    };
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.x + this.ballRadius > this.game.canvas.width + 500) {
      this.game.playerScore += 1;

      this.resetBall();
    }
    if (this.position.x - this.ballRadius < 0 - 500) {
      this.game.AIScore += 1;

      this.resetBall();
    }

    if (
      this.position.y + this.ballRadius > this.game.canvas.height ||
      this.position.y - this.ballRadius < 0
    ) {
      this.velocity.y *= -1;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "red";

    // drawing a circle
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.ballRadius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }

  resetBall() {
    this.position.x = this.game.canvas.width / 2;
    this.position.y = this.game.canvas.height / 2;
    this.velocity.y = 0;
    this.velocity.x = 8;
  }
}
