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

  frame: number;

  image: HTMLImageElement;

  position: number;

  constructor({
    game,
    enemyImageSrc,
    width,
    height,
  }: {
    game: Game;
    enemyImageSrc: string;
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
    this.image.src = enemyImageSrc;
    this.position = Math.floor(Math.random() * 2);
  }

  draw() {
    this.context.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.position === 0
        ? this.game.height - this.height - FIRST_LINE_DISTANCE
        : this.game.height - this.height - FIRST_LINE_DISTANCE - SECOND_LINE_DISTANCE,
      this.width,
      this.height,
    );
  }

  update() {
    if (this.x < -this.width) {
      this.x = this.game.width;
      this.position = Math.floor(Math.random() * 2);
    }

    if (this.game.gameFrame % 4 === 0) {
      if (this.frame > 2) {
        this.frame = 0;
      } else {
        this.frame += 1;
      }
    }

    this.x -= this.game.gameSpeed;
  }
}
