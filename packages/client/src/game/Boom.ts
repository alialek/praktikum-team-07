// eslint-disable-next-line import/no-extraneous-dependencies
import throttle from 'lodash.throttle';

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

  public update() {
    this.throttleBoomEffect();
  }
}
