import {
  KEY_ARROW_DOWN,
  KEY_ARROW_UP,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_SPACE,
} from '@/сonstants/game';

export class InputHandler {
  keys: string[];

  constructor() {
    this.keys = [];
    window.addEventListener('keydown', ({ code }) => {
      if (
        (code === KEY_ARROW_DOWN ||
          code === KEY_ARROW_UP ||
          code === KEY_LEFT ||
          code === KEY_RIGHT ||
          code === KEY_SPACE) &&
        this.keys.indexOf(code) === -1
      ) {
        this.keys.push(code);
      }
    });

    window.addEventListener('keyup', ({ code }) => {
      if (
        code === KEY_ARROW_DOWN ||
        code === KEY_ARROW_UP ||
        code === KEY_LEFT ||
        code === KEY_RIGHT ||
        code === KEY_SPACE
      ) {
        this.keys.splice(this.keys.indexOf(code), 1);
      }
    });
  }
}
