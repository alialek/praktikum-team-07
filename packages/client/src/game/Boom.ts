import { Game } from './Game';

export class Boom {
  game: Game;

  context: CanvasRenderingContext2D;

  width: number;

  height: number;

  spriteWidth: number;

  spriteHeight: number;

  x: number;

  frame: number;

  image: HTMLImageElement;

  constructor({
    game,
    boomImageSrc,
    width,
    height,
  }: {
    game: Game;
    boomImageSrc: string;
    width: number;
    height: number;
  }) {
    this.game = game;
    this.context = this.game.context;
    this.width = width;
    this.height = height;
    this.frame = 0;
    this.spriteWidth = this.width;
    this.spriteHeight = this.height;
    this.x = this.game.width;
    this.image = new Image();
    this.image.src = boomImageSrc;
  }

  draw(frontHeroCords: number, enemyAssCords: number) {
    this.context.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      frontHeroCords,
      enemyAssCords,
      this.width,
      this.height,
    );
  }

  update() {
    if (this.game.gameFrame % 12 === 0) {
      if (this.frame > 8) {
        this.frame = 0;
      } else {
        this.frame += 1;
      }
    }
  }
}
