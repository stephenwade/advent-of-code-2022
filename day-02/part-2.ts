#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';
import { sum } from '~/util/reducers';

const inputText = readInput(__dirname);

type GameChoice = 'rock' | 'paper' | 'scissors';
type ResultRequirement = 'lose' | 'draw' | 'win';

type Round = {
  opponent: GameChoice;
  response: ResultRequirement;
};

const decryptChoice: Record<string, GameChoice> = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
};

const decryptRequirement: Record<string, ResultRequirement> = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
};

function parse(line: string): Round {
  const [opp, res] = line.split(' ');

  const opponent = decryptChoice[opp];
  const response = decryptRequirement[res];

  assert.ok(opponent);
  assert.ok(response);

  return { opponent, response };
}

const strategy = inputText.split('\n').map(parse);

function play({ response }: Round): number {
  if (response === 'lose') return 0;
  if (response === 'draw') return 3;
  /* if (response === 'win') */ return 6;
}

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

function scoreShape({ opponent, response }: Round): number {
  if (opponent === 'rock') {
    if (response === 'lose') return SCISSORS;
    if (response === 'draw') return ROCK;
    /* if (response === 'win') */ return PAPER;
  }

  if (opponent === 'paper') {
    if (response === 'lose') return ROCK;
    if (response === 'draw') return PAPER;
    /* if (response === 'win') */ return SCISSORS;
  }

  /* if (opponent === 'scissors' { */
  if (response === 'lose') return PAPER;
  if (response === 'draw') return SCISSORS;
  /* if (response === 'win') */ return ROCK;
  /* } */
}

function score(round: Round): number {
  return scoreShape(round) + play(round);
}

console.log(strategy.map(score).reduce(sum));
