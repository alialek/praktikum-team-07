import { Game } from './Game';

export class UI {
  game: Game;

  fontSize: number;

  fontFamily: string;

  fontColor: string;

  constructor(game: Game) {
    this.game = game;
    this.fontSize = 20;
    this.fontFamily = 'Roboto';
    this.fontColor = '#fff';
  }

  draw() {
    this.game.context.font = `${this.fontSize}px ${this.fontFamily}`;
    this.game.context.textAlign = 'left';
    this.game.context.fillStyle = this.fontColor;

    this.game.context.fillText(`Score: ${localStorage.getItem('gameScore')}`, 25, 25);
  }
}
