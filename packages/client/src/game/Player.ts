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

  image: HTMLImageElement;

  position: number;

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
    this.spriteHeigth = this.height;
    this.frame = 0;
    this.x = 0;
    this.image = new Image();
    this.image.src = playerImageSrc;
    this.position = parseInt(JSON.parse(localStorage.getItem('position') || '0'), 10);

    window.addEventListener('keydown', ({ key }: KeyboardEvent) => {
      if (key === KEY_ARROW_UP) {
        this.position = 1;
      } else if (key === KEY_ARROW_DOWN) {
        this.position = 0;
      }
      localStorage.setItem('position', this.position.toString());
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
