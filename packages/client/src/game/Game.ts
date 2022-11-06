import { Background } from './Background';
import { Enemy } from './Enemy';
import { Player } from './Player';

import backgroundImagePng from '@/assets/images/background.png';
import enemyImagePng from '@/assets/images/enemy.png';
import playerImagePng from '@/assets/images/player.png';

export class Game {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  gameSpeed: number;
  gameFrame: number;
  background: Background;
  player: Player;
  enemy: Enemy;

  constructor({ context }: { context: CanvasRenderingContext2D }) {
    this.context = context;
    this.width = context.canvas.width;
    this.height = context.canvas.height;
    this.gameSpeed = 1;
    this.gameFrame = 0;

    this.background = new Background(context, backgroundImagePng, this.gameSpeed);

    this.player = new Player({
      game: this,
      playerImageSrc: playerImagePng,
      width: 244,
      height: 205,
    });
    this.enemy = new Enemy({
      game: this,
      emenyImageSrc: enemyImagePng,
      width: 244,
      height: 208,
    });
  }

  draw() {
    this.background.draw();
    if (this.enemy.position === 0) {
      this.player.draw();
      this.enemy.draw();
    } else {
      this.enemy.draw();
      this.player.draw();
    }
  }

  update() {
    this.gameFrame++;
    if (
      this.player.position === this.enemy.position &&
      this.player.x + this.player.width > this.enemy.x
    ) {
      console.log('collision', {
        pos: this.player.position === this.enemy.position,
        gt: this.player.x + this.player.width < this.enemy.x,
        player: this.player.x + this.player.width,
        enemy: this.enemy.x,
      });
    } else {
      this.background.update();
      this.player.update();
      this.enemy.update();
    }
    console.log('updateGame');
  }
}
