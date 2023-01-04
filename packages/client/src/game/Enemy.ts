import { FIRST_LINE_DISTANCE, SECOND_LINE_DISTANCE } from '@/сonstants/game';
import { Game } from './Game';

export class Enemy {
  private readonly game: Game;

  private readonly context: CanvasRenderingContext2D;

  private readonly _width: number;

  private readonly _height: number;

  private readonly spriteWidth: number;

  private readonly spriteHeight: number;

  private readonly image: HTMLImageElement;

  private _x: number;

  private _frame: number;

  private _y: number;

  private _position: number;

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
    this._width = width;
    this._height = height;
    this._frame = 0;
    this.spriteWidth = this.width;
    this.spriteHeight = this.height;
    this._x = parseInt(
      JSON.parse(localStorage.getItem('positionX') || this.game.width.toString()),
      10,
    );
    this._y = 0;
    this.image = new Image();
    this.image.src = enemyImageSrc;
    this._position = parseInt(
      JSON.parse(
        localStorage.getItem('positionY') || Math.floor(Math.random() * 2).toString(),
      ),
      10,
    );
  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  public get x() {
    return this._x;
  }

  private set x(value) {
    this._x = value;
  }

  public get y() {
    return this._y;
  }

  private set y(value) {
    this._y = value;
  }

  public get position() {
    return this._position;
  }

  private set position(value) {
    this._position = value;
  }

  public get frame() {
    return this._frame;
  }

  private set frame(value) {
    this._frame = value;
  }

  public draw(): void {
    this.context.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  private onMovement() {
    if (this.position === 0) {
      this.y = this.game.height - this.height - FIRST_LINE_DISTANCE;
    } else {
      this.y =
        this.game.height - this.height - FIRST_LINE_DISTANCE - SECOND_LINE_DISTANCE;
    }
  }

  public update() {
    this.onMovement();
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
    localStorage.setItem('positionX', this.x.toString());
    localStorage.setItem('positionY', this.position.toString());
  }
}
