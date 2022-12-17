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

  scoreInterval: ReturnType<typeof setInterval>;

  gameSpeedInterval: ReturnType<typeof setInterval>;

  constructor({
    context,
    setIsRunning,
    isPaused,
    gameSpeed,
    gameScore,
    gameFrame,
  }: {
    context: CanvasRenderingContext2D;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    isPaused: boolean;
    gameSpeed: number;
    gameScore: number;
    gameFrame: number;
  }) {
    this.context = context;
    this.setIsRunning = setIsRunning;
    this.isPaused = isPaused;
    this.width = context.canvas.width;
    this.height = context.canvas.height;
    this.gameSpeed = gameSpeed; // 1
    this.gameFrame = gameFrame; // 0
    this.gameScore = gameScore; // 0

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
      emenyImageSrc: enemyImagePng,
      width: 244,
      height: 208,
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

      if (this.enemy.position === 0) {
        this.player.draw();
        this.enemy.draw();
      } else {
        this.enemy.draw();
        this.player.draw();
      }
    }
  }

  update() {
    if (!this.isPaused) {
      this.gameFrame += 1;

      if (
        this.player.position === this.enemy.position &&
        this.player.x + this.player.width > this.enemy.x
      ) {
        this.setIsRunning(false);
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
