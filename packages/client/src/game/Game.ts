import React from 'react';
import backgroundImagePng from '@/assets/images/gameBackground.png';
import enemyImagePng from '@/assets/images/gameEnemy.png';
import playerImagePng from '@/assets/images/gamePlayer.png';
import { Background } from './Background';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { UI } from './UI';
import { InputHandler } from '@/game/InputHandler';
import { window } from '@/utils/ssrWindow';

/**
 * @class Game
 * @classdesc Основной класс игры
 *
 * @param {CanvasRenderingContext2D} context
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsRunning Функция устанавливающая состояние игры (старт/пауза)
 * @param {React.Dispatch<React.SetStateAction<Record<string, number>>>} setCords Функция устанавливает координаты столкновения
 * @param {boolean} isPaused Состояние игры (старт/пауза)
 */
export class Game {
  private readonly _width: number;

  private readonly _height: number;

  private readonly _context: CanvasRenderingContext2D;

  private readonly gameSpeedInterval: ReturnType<typeof setInterval>;

  private _gameSpeed: number;

  private _gameFrame: number;

  private _gameScore: number;

  private _bestScore: number;

  private background: Background;

  private ui: UI;

  private player: Player;

  private enemy: Enemy;

  private readonly scoreInterval: ReturnType<typeof setInterval>;

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
    this._gameSpeed = parseInt(
      JSON.parse(window.localStorage.getItem('gameSpeed') || '1'),
      10,
    ); // 1
    this._gameFrame = parseInt(
      JSON.parse(window.localStorage.getItem('gameFrame') || '0'),
      10,
    ); // 0
    this._gameScore = parseInt(
      JSON.parse(window.localStorage.getItem('gameScore') || '0'),
      10,
    ); // 0
    this._bestScore = parseInt(
      JSON.parse(window.localStorage.getItem('bestScore') || '0'),
      10,
    ); // 0

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
      this._gameScore += 1;
    }, 1000 * this._gameSpeed);

    this.gameSpeedInterval = setInterval(() => {
      this._gameSpeed += 0.3;
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

  public set gameFrame(value) {
    this._gameFrame = value;
  }

  public get gameScore() {
    return this._gameScore;
  }

  /**
   * @function draw
   * @description Функция отвечающая за отрисовку
   */
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

  /**
   * @function flowerbed
   * @description Алгоритм вычисления пересечения двух прямых на плоскости
   *
   * @param {number[][]} array Массив координат игрока и противника
   * @private
   */
  private static flowerbed(array: number[][]): boolean {
    array.sort();

    const result: number[][] = [];

    let idx = 0;
    let [bigStart, bigEnd] = array[idx];

    idx += 1;

    while (idx < array.length) {
      if (bigStart <= array[idx][0] && array[idx][0] <= bigEnd) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, currentEnd] = array[idx];
        idx += 1;
        if (currentEnd > bigEnd) bigEnd = currentEnd;
      } else {
        result.push([bigStart, bigEnd]);
        [bigStart, bigEnd] = array[idx];
        idx += 1;
      }
    }
    result.push([bigStart, bigEnd]);

    return result.length === 1;
  }

  /**
   * @function getXCollisionCords
   * @description Функция возврата координаты по X для отображения взрыва
   *
   * @param arrHeroCords
   * @param arrEnemyCords
   * @private
   */
  private static getXCollisionCords(
    arrHeroCords: number[],
    arrEnemyCords: number[],
  ): number {
    const [heroFrontCords, heroAssCords] = arrHeroCords;
    const [enemyFrontCords, enemyAssCords] = arrEnemyCords;

    if (heroFrontCords >= enemyAssCords && heroFrontCords < enemyFrontCords)
      return heroFrontCords;

    return heroAssCords;
  }

  /**
   * @function update
   * @description Функция отвечает за обновление координат персонажей
   */
  public update() {
    if (!this.isPaused) {
      this.gameFrame += 1;

      const isOnOneStraightLine = this.player.y === this.enemy.y;

      const heroFrontCords = this.player.width + this.player.x;
      const heroAssCords = heroFrontCords - this.player.width;

      const enemyFrontCords = this.enemy.x + this.enemy.width;
      const enemyAssCords = this.enemy.x;

      const isCollision = Game.flowerbed([
        [heroAssCords, heroFrontCords],
        [enemyAssCords, enemyFrontCords],
      ]);

      if (isOnOneStraightLine && isCollision) {
        const boomCords = {
          hero: Game.getXCollisionCords(
            [heroFrontCords, heroAssCords],
            [enemyFrontCords, enemyAssCords],
          ),
          enemy: this.enemy.y,
        };
        this.setIsRunning(false);
        this.setCords(boomCords);
        clearInterval(this.scoreInterval);
        clearInterval(this.gameSpeedInterval);
      } else {
        this.background.update();
        this.player.update(this.input.keys);
        this.enemy.update();
        window.localStorage.setItem('gameSpeed', this.gameSpeed.toString());
        window.localStorage.setItem('gameScore', this.gameScore.toString());
        window.localStorage.setItem('gameFrame', this.gameFrame.toString());
        if (this._gameScore > this._bestScore) {
          this._bestScore = this._gameScore;
          window.localStorage.setItem('bestScore', this._bestScore.toString());
        }
      }
    } else {
      window.localStorage.setItem('isPaused', 'true');
    }
  }
}

export type GameType = typeof Game;
