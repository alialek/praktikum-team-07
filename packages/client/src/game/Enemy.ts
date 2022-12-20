import { FIRST_LINE_DISTANCE, SECOND_LINE_DISTANCE } from '@/сonstants/game';
import { Game } from './Game';

export class Enemy {
  game: Game;

  context: CanvasRenderingContext2D;

  width: number;

  height: number;

  spriteWidth: number;

  spriteHeight: number;

  x: number;

  image: HTMLImageElement;

  y: number; // position: number;

  // positionX: number;

  constructor({
    game,
    emenyImageSrc,
    width,
    height,
  }: {
    game: Game;
    emenyImageSrc: string;
    width: number;
    height: number;
  }) {
    this.game = game;
    this.context = this.game.context;
    this.width = width;
    this.height = height;
    this.spriteWidth = this.width;
    this.spriteHeight = this.height;
    this.x = parseInt(
      JSON.parse(localStorage.getItem('positionX') || this.game.width.toString()),
      10,
    ); // this.game.width;
    this.image = new Image();
    this.image.src = emenyImageSrc;
    this.y = parseInt(
      JSON.parse(
        localStorage.getItem('positionY') || Math.floor(Math.random() * 2).toString(),
      ),
      10,
    );
  }

  draw(): void {
    this.context.drawImage(
      this.image,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y === 0
        ? this.game.height - this.height - FIRST_LINE_DISTANCE
        : this.game.height - this.height - FIRST_LINE_DISTANCE - SECOND_LINE_DISTANCE,
      this.width,
      this.height,
    );
  }

  update() {
    if (this.x < -this.width) {
      this.x = this.game.width;
      this.y = Math.floor(Math.random() * 2);
    }

    this.x -= this.game.gameSpeed;
    localStorage.setItem('positionX', this.x.toString());
    localStorage.setItem('positionY', this.y.toString());
  }
}
