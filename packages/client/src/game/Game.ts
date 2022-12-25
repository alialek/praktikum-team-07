import React from 'react';
import backgroundImagePng from '@/assets/images/gameBackground.png';
import enemyImagePng from '@/assets/images/gameEnemy.png';
import playerImagePng from '@/assets/images/gamePlayer.png';
import boomImagePng from '@/assets/images/boom.png';
import { Background } from './Background';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { Boom } from '@/game/Boom';
import { UI } from './UI';

export class Game {
  context: CanvasRenderingContext2D;

  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;

  isPaused: boolean;

  width: number;

  height: number;

  gameSpeed: number;

  gameFrame: number;

  gameScore: number;

  background: Background;

  ui: UI;

  player: Player;

  enemy: Enemy;

  boom: Boom;

  scoreInterval: ReturnType<typeof setInterval>;

  gameSpeedInterval: ReturnType<typeof setInterval>;

  constructor({
    context,
    setIsRunning,
    isPaused,
  }: {
    context: CanvasRenderingContext2D;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    isPaused: boolean;
  }) {
    this.context = context;
    this.setIsRunning = setIsRunning;
    this.isPaused = isPaused;
    this.width = context.canvas.width;
    this.height = context.canvas.height;
    this.gameSpeed = parseInt(JSON.parse(localStorage.getItem('gameSpeed') || '1'), 10); // 1
    this.gameFrame = parseInt(JSON.parse(localStorage.getItem('gameFrame') || '0'), 10); // 0
    this.gameScore = parseInt(JSON.parse(localStorage.getItem('gameScore') || '0'), 10); // 0

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

    this.boom = new Boom({
      game: this,
      boomImageSrc: boomImagePng,
      width: 96,
      height: 96,
    });

    this.scoreInterval = setInterval(() => {
      this.gameScore += 1;
    }, 1000 * this.gameSpeed);

    this.gameSpeedInterval = setInterval(() => {
      this.gameSpeed += 0.1;
    }, 1000);
  }

  draw() {
    if (!this.isPaused) {
      this.background.draw();
      this.ui.draw();

      if (this.enemy.y === 0) {
        this.player.draw();
        this.boom.update();
        this.enemy.draw();
      } else {
        this.enemy.draw();
        this.boom.update();
        this.player.draw();
      }
    }
  }

  update() {
    if (!this.isPaused) {
      this.gameFrame += 1;
      if (
        this.player.position === this.enemy.y &&
        this.player.x + this.player.width > this.enemy.x
      ) {
        this.setIsRunning(false);

        this.boom.draw(this.player.width, this.enemy.width);
        clearInterval(this.scoreInterval);
        clearInterval(this.gameSpeedInterval);
        localStorage.clear();
      } else {
        this.background.update();
        this.player.update();
        this.enemy.update();
        localStorage.setItem('gameSpeed', this.gameSpeed.toString());
        localStorage.setItem('gameScore', this.gameScore.toString());
        localStorage.setItem('gameFrame', this.gameFrame.toString());
      }
    } else {
      localStorage.setItem('isPaused', 'true');
    }
  }
}

export type GameType = typeof Game;
