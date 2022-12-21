import {
  KEY_ARROW_DOWN,
  KEY_ARROW_UP,
  FIRST_LINE_DISTANCE,
  SECOND_LINE_DISTANCE,
} from '@/сonstants/game';
import { Game } from './Game';

export class Player {
  game: Game;

  context: CanvasRenderingContext2D;

  width: number;

  height: number;

  spriteWidth: number;

  spriteHeight: number;

  frame: number;

  x: number;

  image: HTMLImageElement;

  position: 0 | 1;

  constructor({
    game,
    playerImageSrc,
    width,
    height,
  }: {
    game: Game;
    playerImageSrc: string;
    width: number;
    height: number;
  }) {
    this.game = game;
    this.context = this.game.context;
    this.width = width;
    this.height = height;
    this.spriteWidth = this.width;
    this.spriteHeight = this.height;
    this.frame = 0;
    this.x = 56;
    this.image = new Image();
    this.image.src = playerImageSrc;
    this.position = 0;

    this.handler = this.handler.bind(this);
    this.gameController();
  }

  gameController() {
    window.addEventListener('keydown', this.handler);
  }

  handler({ code }: KeyboardEvent) {
    if (code === KEY_ARROW_UP) {
      this.position = 1;
    } else if (code === KEY_ARROW_DOWN) {
      this.position = 0;
    }
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
    if (this.game.gameFrame % 6 === 0) {
      if (this.frame > 4) {
        this.frame = 0;
      } else {
        this.frame += 1;
      }
    }
  }
}
