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

  constructor(game: Game, backgroundImageSrc: string) {
    this.game = game;
    this.ctx = this.game.context;
    this.image = new Image();
    this.image.src = backgroundImageSrc;
    this.x = parseInt(JSON.parse(localStorage.getItem('backgroundX') || '0'), 10);
    this.y = parseInt(JSON.parse(localStorage.getItem('backgroundY') || '0'), 10);
    this.width = 8390;
    this.height = 472;
    this.backgroundFrame = parseInt(
      JSON.parse(localStorage.getItem('backgroundFrame') || '0'),
      10,
    );
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    this.backgroundFrame -= this.game.gameSpeed;
    localStorage.setItem('backgroundX', this.x.toString());
    localStorage.setItem('backgroundY', this.y.toString());
    localStorage.setItem('backgroundFrame', this.backgroundFrame.toString());
  }

  update() {
    this.x = this.backgroundFrame % this.width;
  }
}
