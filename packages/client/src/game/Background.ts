export class Background {
  ctx: CanvasRenderingContext2D;
  image: any;
  x: number;
  y: number;
  width: number;
  height: number;
  gameSpeed: number;
  gameFrame: number;

  constructor(ctx: CanvasRenderingContext2D, backgroundImageSrc: any, gameSpeed: number) {
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = backgroundImageSrc;
    this.x = 0;
    this.y = 0;
    this.width = 8390;
    this.height = 472;
    this.gameSpeed = gameSpeed;
    this.gameFrame = 0;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    this.gameFrame -= this.gameSpeed;
  }

  update() {
    // if (this.x <= this.width) {
    //   this.x = 0
    // }
    this.x = this.gameFrame % this.width;
  }
}
