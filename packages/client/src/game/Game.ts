import React from 'react';
import backgroundImagePng from '@/assets/images/gameBackground.png';
import enemyImagePng from '@/assets/images/gameEnemy.png';
import playerImagePng from '@/assets/images/gamePlayer.png';
import { Background } from './Background';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { UI } from './UI';

export class Game {
  context: CanvasRenderingContext2D;

  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;

  width: number;

  height: number;

  gameSpeed: number;

  gameFrame: number;

  gameScore: number;

  background: Background;

  ui: UI;

  player: Player;

  enemy: Enemy;

  scoreInterval: ReturnType<typeof setInterval>;

  gameSpeedInterval: ReturnType<typeof setInterval>;

  constructor({
    context,
    setIsRunning,
  }: {
    context: CanvasRenderingContext2D;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    this.context = context;
    this.setIsRunning = setIsRunning;
    this.width = context.canvas.width;
    this.height = context.canvas.height;
    this.gameSpeed = 1;
    this.gameFrame = 0;
    this.gameScore = 0;

    this.background = new Background(this, backgroundImagePng);
    this.ui = new UI(this);

    this.player = new Player({
      game: this,
      playerImageSrc: playerImagePng,
      width: 244,
      height: 205,
    });
    this.enemy = new Enemy({
      game: this,
      enemyImageSrc: enemyImagePng,
      width: 244,
      height: 205,
    });

    this.scoreInterval = setInterval(() => {
      this.gameScore += 1;
    }, 1000 * this.gameSpeed);

    this.gameSpeedInterval = setInterval(() => {
      this.gameSpeed += 0.1;
    }, 1000);
  }

  draw() {
    this.background.draw();
    this.ui.draw();

    if (this.enemy.position === 0) {
      this.player.draw();
      this.enemy.draw();
    } else {
      this.enemy.draw();
      this.player.draw();
    }
  }

  update() {
    this.gameFrame += 1;

    if (
      this.player.position === this.enemy.position &&
      this.player.x + this.player.width > this.enemy.x
    ) {
      console.log('end');
      this.setIsRunning(false);

      clearInterval(this.scoreInterval);
      clearInterval(this.gameSpeedInterval);
    } else {
      this.background.update();
      this.player.update();
      this.enemy.update();
    }
  }
}

export type GameType = typeof Game;
