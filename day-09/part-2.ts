#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { last } from '~/util/arrays';
import { readInput } from '~/util/read-input';

const inputText = readInput(__dirname);

const DIRECTIONS = ['D', 'L', 'R', 'U'] as const;
type Direction = typeof DIRECTIONS[number];

function* instructions(): Generator<Direction> {
  for (const line of inputText.split('\n')) {
    const [direction, countText] = line.split(' ');
    assert((DIRECTIONS as readonly string[]).includes(direction));

    for (let i = 0; i < Number(countText); i += 1) {
      yield direction as Direction;
    }
  }
}

type Position = { x: number; y: number };

const ROPE_LENGTH = 10;
const rope: Position[] = [];
for (let i = 0; i < ROPE_LENGTH; i += 1) {
  rope.push({ x: 0, y: 0 });
}

function positionToString({ x, y }: Position): string {
  return `${x},${y}`;
}
const tailPositions: Set<string> = new Set();
tailPositions.add(positionToString(last(rope)));

function updatePositions(direction: Direction) {
  // update head
  if (direction === 'D') rope[0].y -= 1;
  if (direction === 'L') rope[0].x -= 1;
  if (direction === 'R') rope[0].x += 1;
  if (direction === 'U') rope[0].y += 1;

  // update rest of rope
  for (let i = 1; i < rope.length; i += 1) {
    const previousKnot = rope[i - 1];
    const thisKnot = rope[i];
    if (
      Math.abs(previousKnot.x - thisKnot.x) > 1 ||
      Math.abs(previousKnot.y - thisKnot.y) > 1
    ) {
      thisKnot.x += Math.sign(previousKnot.x - thisKnot.x);
      thisKnot.y += Math.sign(previousKnot.y - thisKnot.y);
    }
  }
  tailPositions.add(positionToString(last(rope)));
}

for (const direction of instructions()) {
  updatePositions(direction);
}

console.log(tailPositions.size);
