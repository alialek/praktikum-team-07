import { Game } from './Game';

export class UI {
  private readonly _game: Game;

  private readonly _fontSize: number;

  private readonly _fontWeight: string;

  private readonly _fontFamily: string;

  private readonly _fontColor: string;

  constructor(game: Game) {
    this._game = game;
    this._fontSize = 24;
    this._fontWeight = 'bold';
    this._fontFamily = 'Arial';
    this._fontColor = '#fff';
  }

  private get game() {
    return this._game;
  }

  private get fontSize() {
    return this._fontSize;
  }

  private get fontWeight() {
    return this._fontWeight;
  }

  private get fontFamily() {
    return this._fontFamily;
  }

  private get fontColor() {
    return this._fontColor;
  }

  // eslint-disable-next-line class-methods-use-this
  private roundRect(
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

  public draw() {
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
