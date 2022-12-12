import { Game } from './Game';

export class Collision {
  game: Game;

  context: CanvasRenderingContext2D;

  width: number;

  height: number;

  spriteWidth: number;

  spriteHeigth: number;

  frame: number;

  x: number;

  y: number;

  image: HTMLImageElement;

  constructor({
    game,
    collisionImageSrc,
    width,
    height,
    x,
    y,
  }: {
    game: Game;
    collisionImageSrc: string;
    width: number;
    height: number;
    x: number;
    y: number;
    maxFrame: number;
  }) {
    this.game = game;
    this.context = this.game.context;
    this.width = width;
    this.height = height;
    this.spriteWidth = this.width;
    this.spriteHeigth = this.height;
    this.frame = 0;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.image = new Image();
    this.image.src = collisionImageSrc;
  }

  draw() {
    this.context.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeigth,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  update() {
    console.log('collision update', this.frame);
    this.frame += 1;
  }
}
