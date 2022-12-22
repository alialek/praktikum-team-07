import { Game } from './Game';

export class UI {
  game: Game;

  fontSize: number;

  fontWeight: string;

  fontFamily: string;

  fontColor: string;

  constructor(game: Game) {
    this.game = game;
    this.fontSize = 24;
    this.fontWeight = 'bold';
    this.fontFamily = 'Arial';
    this.fontColor = '#fff';
  }

  // eslint-disable-next-line class-methods-use-this
  roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    fill: boolean,
    stroke = true,
  ) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
      ctx.stroke();
    }
    if (fill) {
      ctx.fill();
    }
  }

  draw() {
    this.game.context.lineWidth = 4;
    this.game.context.strokeStyle = '#000000';
    this.game.context.fillStyle = 'rgba(51, 51, 51, 0.76)';
    this.roundRect(this.game.context, 25, 12, 150, 50, 16, true, false);
    this.game.context.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
    this.game.context.textAlign = 'left';
    this.game.context.fillStyle = this.fontColor;

    this.game.context.fillText(`Score: ${localStorage.getItem('gameScore')}`, 35, 45);
  }
}
