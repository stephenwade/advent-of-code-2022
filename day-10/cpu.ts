import { EventEmitter } from 'node:stream';

import { Instruction } from './instruction';

export class CPU {
  #cycle: number;

  #x: number;

  #emitter: EventEmitter;

  constructor() {
    this.#cycle = 0;

    this.#x = 1;

    this.#emitter = new EventEmitter();
  }

  public do(instruction: Instruction) {
    if (instruction.type === 'addx') {
      this.advanceCycle();
      this.advanceCycle();

      this.#x += instruction.value;
    }

    if (instruction.type === 'noop') {
      this.advanceCycle();
    }
  }

  private advanceCycle() {
    this.#cycle += 1;
    this.#emitter.emit('duringCycle', this.#cycle, this.#x);
  }

  public on(
    event: 'duringCycle',
    callback: (cycle: number, x: number) => void
  ) {
    this.#emitter.on(event, callback);
  }

  public off(
    event: 'duringCycle',
    callback: (cycle: number, x: number) => void
  ) {
    this.#emitter.off(event, callback);
  }

  get cycle() {
    return this.#cycle;
  }

  get x() {
    return this.#x;
  }
}
