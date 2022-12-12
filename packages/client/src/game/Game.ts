import React from 'react';
import backgroundImagePng from '@/assets/images/gameBackground.png';
import collisionImagePng from '@/assets/images/gameExplosion.png';
import enemyImagePng from '@/assets/images/gameEnemy.png';
import playerImagePng from '@/assets/images/gamePlayer.png';
import {
  BACKGROUND_SPRITE_HEIGHT,
  BACKGROUND_SPRITE_WIDTH,
  COLLISION_MAX_FRAME,
  COLLISION_SPRITE_HEIGHT,
  COLLISION_SPRITE_WIDTH,
  ENEMY_SPRITE_HEIGHT,
  ENEMY_SPRITE_WIDTH,
  PLAYER_SPRITE_HEIGHT,
  PLAYER_SPRITE_WIDTH,
} from '@/сonstants/game';
import { Background } from './Background';
import { Collision } from './Collision';
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

  collision: Collision;

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

    this.background = new Background({
      game: this,
      backgroundImageSrc: backgroundImagePng,
      width: BACKGROUND_SPRITE_WIDTH,
      height: BACKGROUND_SPRITE_HEIGHT,
    });
    this.ui = new UI(this);

    this.player = new Player({
      game: this,
      playerImageSrc: playerImagePng,
      width: PLAYER_SPRITE_WIDTH,
      height: PLAYER_SPRITE_HEIGHT,
    });
    this.enemy = new Enemy({
      game: this,
      emenyImageSrc: enemyImagePng,
      width: ENEMY_SPRITE_WIDTH,
      height: ENEMY_SPRITE_HEIGHT,
    });

    this.collision = new Collision({
      game: this,
      collisionImageSrc: collisionImagePng,
      width: COLLISION_SPRITE_WIDTH,
      height: COLLISION_SPRITE_HEIGHT,
      x: PLAYER_SPRITE_WIDTH * 0.5,
      y: this.height - PLAYER_SPRITE_HEIGHT * 0.5,
      maxFrame: COLLISION_MAX_FRAME,
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
      for (let i = 0; i < COLLISION_MAX_FRAME; i += 1) {
        this.collision.draw();
        this.collision.update();
      }

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
