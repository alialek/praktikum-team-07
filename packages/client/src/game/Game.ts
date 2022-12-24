import React from 'react';
import backgroundImagePng from '@/assets/images/gameBackground.png';
import enemyImagePng from '@/assets/images/gameEnemy.png';
import playerImagePng from '@/assets/images/gamePlayer.png';
import { Background } from './Background';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { UI } from './UI';
import { InputHandler } from '@/game/InputHandler';

export class Game {
  private readonly _width: number;

  private readonly _height: number;

  private readonly _context: CanvasRenderingContext2D;

  private readonly gameSpeedInterval: ReturnType<typeof setInterval>;

  private _gameSpeed: number;

  private _gameFrame: number;

  private gameScore: number;

  private background: Background;

  private ui: UI;

  private player: Player;

  private enemy: Enemy;

  private scoreInterval: ReturnType<typeof setInterval>;

  private input: InputHandler;

  public setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;

  public setCords: React.Dispatch<React.SetStateAction<Record<string, number>>>;

  public isPaused: boolean;

  constructor({
    context,
    setIsRunning,
    setCords,
    isPaused,
  }: {
    context: CanvasRenderingContext2D;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    setCords: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    isPaused: boolean;
  }) {
    this._context = context;
    this.setIsRunning = setIsRunning;
    this.setCords = setCords;
    this.isPaused = isPaused;
    this._width = context.canvas.width;
    this._height = context.canvas.height;
    this.input = new InputHandler();
    this._gameSpeed = parseInt(JSON.parse(localStorage.getItem('gameSpeed') || '1'), 10); // 1
    this._gameFrame = parseInt(JSON.parse(localStorage.getItem('gameFrame') || '0'), 10); // 0
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

    this.scoreInterval = setInterval(() => {
      this.gameScore += 1;
    }, 1000 * this._gameSpeed);

    this.gameSpeedInterval = setInterval(() => {
      this._gameSpeed += 0.1;
    }, 1000);
  }

  public get context() {
    return this._context;
  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  public get gameSpeed() {
    return this._gameSpeed;
  }

  public get gameFrame() {
    return this._gameFrame;
  }

  public draw() {
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

  public update() {
    if (!this.isPaused) {
      this._gameFrame += 1;

      const heroFrontCords = this.player.width + this.player.x;
      // const heroAssCords = heroFrontCords - this.player.width;
      const enemyAssCords = this.enemy.x;
      console.log('frontCordsHero:', heroFrontCords);
      console.log('assCordsEnemy:', enemyAssCords);
      if (this.player.y === this.enemy.y && heroFrontCords === enemyAssCords) {
        const boomCords = {
          hero: this.player.width,
          enemy: this.enemy.width,
        };
        this.setIsRunning(false);
        this.setCords(boomCords);

        // clearInterval(this.scoreInterval);
        clearInterval(this.gameSpeedInterval);
        localStorage.clear();
      } else {
        this.background.update();
        this.player.update(this.input.keys);
        this.enemy.update();
        localStorage.setItem('gameSpeed', this._gameSpeed.toString());
        localStorage.setItem('gameScore', this.gameScore.toString());
        localStorage.setItem('gameFrame', this._gameFrame.toString());
      }
    } else {
      localStorage.setItem('isPaused', 'true');
    }
  }
}

export type GameType = typeof Game;
