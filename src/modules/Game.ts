import {Player} from "./Player";
import {Ball} from "./Ball";
import {AIPlayer} from "./AIPlayer";

export class Game {
  public ball: Ball;
  public player: Player;
  public aiPlayer: AIPlayer;
  public playerScore: number = 0;
  public AIScore: number = 0;

  constructor(public canvas: HTMLCanvasElement, public context: CanvasRenderingContext2D) {
    this.aiPlayer = new AIPlayer({game: this});
    this.player = new Player({game: this});
    this.ball = new Ball({game: this});
  }

  update() {
    this.ball.update();
    this.player.update();
    this.aiPlayer.update();
  }

  draw() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawScore();

    this.ball.draw(this.context);
    this.player.draw(this.context);
    this.aiPlayer.draw(this.context);
  }

  drawScore() {
    this.context.fillStyle = "white";
    this.context.font = "bold 20px serif";
    const AIScore = `AI Score: ${this.AIScore}`;

    this.context.fillText(`Player Score: ${this.playerScore}`, 100, 20);
    this.context.fillText(
      AIScore,
      this.canvas.width - 100 - this.context.measureText(AIScore).width,
      20
    );
  }
}
