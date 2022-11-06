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
  spriteHeigth: number;
  frame: number;
  x: number;
  // y: number;
  image: any;
  position: 0 | 1;

  constructor({
    game,
    playerImageSrc,
    width,
    height,
  }: {
    game: Game;
    playerImageSrc: any;
    width: number;
    height: number;
  }) {
    this.game = game;
    this.context = this.game.context;
    this.width = width;
    this.height = height;
    this.spriteWidth = this.width;
    this.spriteHeigth = this.height;
    this.frame = 0;
    this.x = 0;
    // this.y = this.game.height - this.height - FIRST_LINE_DISTANCE;
    this.image = new Image();
    this.image.src = playerImageSrc;
    this.position = 0;

    window.addEventListener('keydown', ({ key }: KeyboardEvent) => {
      if (key === KEY_ARROW_UP) {
        this.position = 1;
        // this.y -= LINE_SWITCH_DISTANCE;
      } else if (key === KEY_ARROW_DOWN) {
        this.position = 0;
        // this.y += LINE_SWITCH_DISTANCE;
      }
    });
  }

  draw() {
    this.context.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeigth,
      this.x,
      this.position === 0
        ? this.game.height - this.height - FIRST_LINE_DISTANCE
        : this.game.height - this.height - FIRST_LINE_DISTANCE - SECOND_LINE_DISTANCE,
      // this.y,
      this.width,
      this.height,
    );
  }

  update() {
    if (this.game.gameFrame % 6 === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
}
