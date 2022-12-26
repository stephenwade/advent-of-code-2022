#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';
import { sum } from '~/util/reducers';

const inputText = readInput(__dirname);

type GameChoice = 'rock' | 'paper' | 'scissors';

type Round = {
  opponent: GameChoice;
  response: GameChoice;
};

const decrypt: Record<string, GameChoice> = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
};

function parse(line: string): Round {
  const [opponent, response] = line.split(' ').map((choice) => decrypt[choice]);

  assert.ok(opponent);
  assert.ok(response);

  return { opponent, response };
}

const strategy = inputText.split('\n').map(parse);

const LOSS = 0;
const DRAW = 3;
const WIN = 6;

function play({ opponent, response }: Round): number {
  if (opponent === 'rock') {
    if (response === 'rock') return DRAW;
    if (response === 'paper') return WIN;
    /* if (response === 'scissors') */ return LOSS;
  }

  if (opponent === 'paper') {
    if (response === 'rock') return LOSS;
    if (response === 'paper') return DRAW;
    /* if (response === 'scissors') */ return WIN;
  }

  /* if (opponent === 'scissors') { */
  if (response === 'rock') return WIN;
  if (response === 'paper') return LOSS;
  /* if (response === 'scissors') */ return DRAW;
  /* } */
}

function scoreShape({ response }: Round): number {
  if (response === 'rock') return 1;
  if (response === 'paper') return 2;
  /* if (response === 'scissors') */ return 3;
}

function score(round: Round): number {
  return scoreShape(round) + play(round);
}

console.log(strategy.map(score).reduce(sum));
