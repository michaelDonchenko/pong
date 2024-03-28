import {Player} from "./Player";
import {Ball} from "./Ball";
import {AIPlayer} from "./AIPlayer";

export class Utils {
  constructor() {}

  static circleRectangleCollision(
    circleX: number,
    circleY: number,
    circleRadius: number,
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number
  ) {
    const closestX = this.clamp(circleX, rectX, rectX + rectWidth);
    const closestY = this.clamp(circleY, rectY, rectY + rectHeight);

    const distX = circleX - closestX;
    const distY = circleY - closestY;

    const distanceSquared = distX * distX + distY * distY;
    return distanceSquared < circleRadius * circleRadius;
  }

  static applyCollisionForce(ball: Ball, paddle: Player | AIPlayer) {
    const newVelocityX = -ball.velocity.x * 1.02;

    const paddleCenter = paddle.position.y + paddle.height / 2;
    const distance = paddleCenter - ball.position.y;

    const newVelocityY = distance * -0.1;

    return {velocityX: newVelocityX, velocityY: newVelocityY};
  }

  static clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max));
  }
}
