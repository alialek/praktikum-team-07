import {
  KEY_ARROW_DOWN,
  KEY_ARROW_UP,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_JUMP,
  FIRST_LINE_DISTANCE,
  SECOND_LINE_DISTANCE,
} from '@/сonstants/game';
import { Game } from './Game';
import { window } from '@/utils/ssrWindow';

/**
 * @class Player
 * @classdesc Класс отвечающий за поведение основного персонажа
 *
 * @param {Game} game Инстанс класса Game (private readonly)
 * @param {HTMLImageElement} enemyImageSrc Спрайт персанажа (private readonly)
 * @param {number} width
 * @param {number} height
 */
export class Player {
  private readonly game: Game;

  private readonly context: CanvasRenderingContext2D;

  private readonly _width: number;

  private readonly _height: number;

  private readonly _maxSpeed: number;

  private readonly _weight: number;

  private readonly image: HTMLImageElement;

  private readonly _leftRoadLine: number;

  private readonly _rightRoadLine: number;

  private _frame: number;

  private _x: number;

  private _y: number;

  private _vy: number;

  private _speed: number;

  private _position: number;

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
    this._width = width;
    this._height = height;
    this._frame = 0;
    this._x = parseInt(JSON.parse(window.localStorage.getItem('playerXCord') || '0'), 10);
    this._y = parseInt(
      JSON.parse(
        window.localStorage.getItem('playerYCord') ||
          String(this.game.height - this._height - FIRST_LINE_DISTANCE),
      ),
      10,
    );
    this._vy = parseInt(
      JSON.parse(window.localStorage.getItem('playerVYCord') || '0'),
      10,
    );
    this._weight = 1;
    this._speed = 0;
    this._maxSpeed = 10;

    this.image = new Image();
    this.image.src = playerImageSrc;
    this._position = parseInt(
      JSON.parse(window.localStorage.getItem('position') || '0'),
      10,
    );
    this._leftRoadLine = this.game.height - this._height - FIRST_LINE_DISTANCE;
    this._rightRoadLine =
      this.game.height - this._height - FIRST_LINE_DISTANCE - SECOND_LINE_DISTANCE;
  }

  public get position() {
    return this._position;
  }

  private set position(value) {
    this._position = value;
  }

  public get leftRoadLine() {
    return this._leftRoadLine;
  }

  public get rightRoadLine() {
    return this._rightRoadLine;
  }

  public get speed() {
    return this._speed;
  }

  private set speed(value) {
    this._speed = value;
  }

  public get maxSpeed() {
    return this._maxSpeed;
  }

  public get weight() {
    return this._weight;
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

  public get vy() {
    return this._vy;
  }

  private set vy(value) {
    this._vy = value;
  }

  public get frame() {
    return this._frame;
  }

  private set frame(value) {
    this._frame = value;
  }

  /**
   * @function draw
   * @description Функция отвечающая за отрисовку
   */
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

  /**
   * @function update
   * @param {string[]} input Массив кодов нажатых клавиш
   *
   * @description Функция отвечает за обновление координат персонажа, анимацию передвижения ног, расчет координаты прыжка
   */
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
    }
    if (input.includes(KEY_ARROW_DOWN)) {
      this.position = 0;
      this.y = this.game.height - this.height - FIRST_LINE_DISTANCE;
    }

    // прыжки
    if (input.includes(KEY_JUMP) && this.onGround()) this.vy -= 24;
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

    window.localStorage.setItem('playerXCord', this.x.toString());
    window.localStorage.setItem('playerYCord', this.y.toString());
    window.localStorage.setItem('playerVYCord', this.vy.toString());
    window.localStorage.setItem('position', this.position.toString());
  }

  /**
   * @function onGround
   * @private
   *
   * @description Функция определяющая находится ли противник на «земле» и на какую «полосу» надо вернуться
   */
  private onGround() {
    if (this.position === 0) return this.y >= this.leftRoadLine;
    return this.y >= this.rightRoadLine;
  }
}
