// eslint-disable-next-line import/no-extraneous-dependencies
import throttle from 'lodash.throttle';

/**
 * @class Boom
 * @classdesc Класс отвечающий за анимацию взрыва
 *
 * @param {CanvasRenderingContext2D} context
 * @param {HTMLImageElement} boomImageSrc Спрайт взрыва (private readonly)
 * @param {number} width
 * @param {number} height
 */
export class Boom {
  private readonly context: CanvasRenderingContext2D;

  private readonly throttleBoomEffect: () => void;

  private readonly width: number;

  private readonly height: number;

  private readonly spriteWidth: number;

  private readonly spriteHeight: number;

  private readonly image: HTMLImageElement;

  private frame: number;

  constructor({
    context,
    boomImageSrc,
    width,
    height,
  }: {
    context: CanvasRenderingContext2D;
    boomImageSrc: string;
    width: number;
    height: number;
  }) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.frame = 0;
    this.spriteWidth = this.width;
    this.spriteHeight = this.height;
    this.image = new Image();
    this.image.src = boomImageSrc;

    this.throttleBoomEffect = throttle(() => {
      if (this.frame >= 1152) {
        this.frame = 0;
      }
      this.frame += 96;
    }, 120);
  }

  /**
   * @function draw
   * @description Функция отвечающая за отрисовку
   */
  public draw(frontHeroCords: number, enemyAssCords: number) {
    this.context.drawImage(
      this.image,
      this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      frontHeroCords,
      enemyAssCords,
      this.width,
      this.height,
    );
  }

  /**
   * @function update
   * @description Функция отвечает за обновление координат анимации взрыва
   */
  public update() {
    this.throttleBoomEffect();
  }
}
