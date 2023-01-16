import {
  KEY_ARROW_DOWN,
  KEY_ARROW_UP,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_JUMP,
} from '@/сonstants/game';

export class InputHandler {
  private readonly _keys: string[];

  constructor() {
    this._keys = [];
    window.addEventListener('keydown', ({ code }) => {
      if (
        (code === KEY_ARROW_DOWN ||
          code === KEY_ARROW_UP ||
          code === KEY_LEFT ||
          code === KEY_RIGHT ||
          code === KEY_JUMP) &&
        this._keys.indexOf(code) === -1
      ) {
        this._keys.push(code);
      }
    });

    window.addEventListener('keyup', ({ code }) => {
      if (
        code === KEY_ARROW_DOWN ||
        code === KEY_ARROW_UP ||
        code === KEY_LEFT ||
        code === KEY_RIGHT ||
        code === KEY_JUMP
      ) {
        this._keys.splice(this._keys.indexOf(code), 1);
      }
    });
  }

  public get keys() {
    return this._keys;
  }
}
