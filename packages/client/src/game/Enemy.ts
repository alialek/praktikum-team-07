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
  // y: number;
  image: any;
  position: number;

  constructor({
    game,
    emenyImageSrc,
    width,
    height,
  }: {
    game: Game;
    emenyImageSrc: any;
    width: number;
    height: number;
  }) {
    this.game = game;
    this.context = this.game.context;
    this.width = width;
    this.height = height;
    this.spriteWidth = this.width;
    this.spriteHeight = this.height;
    this.x = this.game.width;
    // this.y = this.game.height - this.height - FIRST_LINE_DISTANCE;
    this.image = new Image();
    this.image.src = emenyImageSrc;
    this.position = Math.floor(Math.random() * 2);
  }

  draw() {
    this.context.drawImage(
      this.image,
      0,
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
      console.log({ position: this.position });
    }

    this.x -= this.game.gameSpeed;
  }
}
