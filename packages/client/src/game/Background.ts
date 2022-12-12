import { Game } from './Game';

export class Background {
  game: Game;

  ctx: CanvasRenderingContext2D;

  image: HTMLImageElement;

  x: number;

  y: number;

  width: number;

  height: number;

  backgroundFrame: number;

  constructor({
    game,
    backgroundImageSrc,
    width,
    height,
  }: {
    game: Game;
    backgroundImageSrc: string;
    width: number;
    height: number;
  }) {
    this.game = game;
    this.ctx = this.game.context;
    this.image = new Image();
    this.image.src = backgroundImageSrc;
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.backgroundFrame = 0;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    this.backgroundFrame -= this.game.gameSpeed;
  }

  update() {
    this.x = this.backgroundFrame % this.width;
  }
}
