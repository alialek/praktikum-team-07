import { Game } from './Game';

/**
 * @class Background
 * @classdesc Клас отвечающий за обработку фона
 *
 * @param {Game} game
 * @param {string} backgroundImageSrc
 */
export class Background {
  private readonly game: Game;

  private readonly ctx: CanvasRenderingContext2D;

  private readonly image: HTMLImageElement;

  private readonly _y: number;

  private readonly _width: number;

  private readonly _height: number;

  private _x: number;

  private _backgroundFrame: number;

  constructor(game: Game, backgroundImageSrc: string) {
    this.game = game;
    this.ctx = this.game.context;
    this.image = new Image();
    this.image.src = backgroundImageSrc;
    this._x = parseInt(JSON.parse(localStorage.getItem('backgroundX') || '0'), 10);
    this._y = parseInt(JSON.parse(localStorage.getItem('backgroundY') || '0'), 10);
    this._width = 8390;
    this._height = 472;
    this._backgroundFrame = parseInt(
      JSON.parse(localStorage.getItem('backgroundFrame') || '0'),
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

  public get backgroundFrame() {
    return this._backgroundFrame;
  }

  private set backgroundFrame(value) {
    this._backgroundFrame = value;
  }

  /**
   * @function draw
   * @description Функция отвечающая за отрисовку
   */
  public draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    this.backgroundFrame -= this.game.gameSpeed;
    localStorage.setItem('backgroundX', this.x.toString());
    localStorage.setItem('backgroundY', this.y.toString());
    localStorage.setItem('backgroundFrame', this.backgroundFrame.toString());
  }

  /**
   * @function update
   * @description Функция отвечает за обновление координат фона
   */
  public update() {
    this.x = this.backgroundFrame % this.width;
  }
}
