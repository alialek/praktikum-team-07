import {
  KEY_ARROW_DOWN,
  KEY_ARROW_UP,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_SPACE,
  FIRST_LINE_DISTANCE,
  SECOND_LINE_DISTANCE,
} from '@/сonstants/game';
import { Game } from './Game';

export class Player {
  game: Game;

  context: CanvasRenderingContext2D;

  width: number;

  height: number;

  frame: number;

  x: number;

  y: number;

  vy: number;

  speed: number;

  maxSpeed: number;

  weight: number;

  isJump: boolean;

  image: HTMLImageElement;

  position: number;

  leftRoadLine: number;

  rightRoadLine: number;

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
    this.frame = 0;
    this.x = 0;
    this.y = this.game.height - this.height - FIRST_LINE_DISTANCE;
    this.vy = 0;
    this.weight = 1;
    this.speed = 0;
    this.maxSpeed = 10;
    this.isJump = false;

    this.image = new Image();
    this.image.src = playerImageSrc;
    this.position = parseInt(JSON.parse(localStorage.getItem('position') || '0'), 10);
    this.leftRoadLine = this.game.height - this.height - FIRST_LINE_DISTANCE;
    this.rightRoadLine =
      this.game.height - this.height - FIRST_LINE_DISTANCE - SECOND_LINE_DISTANCE;
  }

  draw() {
    this.context.drawImage(
      this.image,
      this.width * this.frame,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  onMovement() {
    if (!this.isJump) {
      if (this.position === 0) return this.leftRoadLine;
      return this.rightRoadLine;
    }
    return this.y;
  }

  update(input: string[]) {
    // по горизонтали
    this.x += this.speed;
    if (input.includes(KEY_RIGHT)) this.speed = this.maxSpeed;
    else if (input.includes(KEY_LEFT)) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

    // по вертикали
    if (input.includes(KEY_ARROW_UP)) {
      this.position = 1;
      this.y =
        this.game.height - this.height - FIRST_LINE_DISTANCE - SECOND_LINE_DISTANCE;
      this.setIsJump(false);
    }
    if (input.includes(KEY_ARROW_DOWN)) {
      this.position = 0;
      this.y = this.game.height - this.height - FIRST_LINE_DISTANCE;
      this.setIsJump(false);
    }

    // прыжки
    if (input.includes(KEY_SPACE) && this.onGround()) {
      this.vy -= 29;
      this.setIsJump(true);
    }
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;

    // анимация ног
    if (this.game.gameFrame % 6 === 0) {
      if (this.frame > 4) {
        this.frame = 0;
      } else {
        this.frame += 1;
      }
    }
  }

  setIsJump(hasJump: boolean) {
    this.isJump = hasJump;
  }

  onGround() {
    if (this.position === 0) return this.y >= this.leftRoadLine;
    return this.y >= this.rightRoadLine;
  }
}
