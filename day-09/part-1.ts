#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

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
const tail: Position = { x: 0, y: 0 };
const head: Position = { x: 0, y: 0 };

function positionToString({ x, y }: Position): string {
  return `${x},${y}`;
}
const tailPositions: Set<string> = new Set();
tailPositions.add(positionToString(tail));

function updatePositions(direction: Direction) {
  // update head
  if (direction === 'D') head.y -= 1;
  if (direction === 'L') head.x -= 1;
  if (direction === 'R') head.x += 1;
  if (direction === 'U') head.y += 1;

  // update tail
  if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
    tail.x += Math.sign(head.x - tail.x);
    tail.y += Math.sign(head.y - tail.y);

    tailPositions.add(positionToString(tail));
  }
}

for (const direction of instructions()) {
  updatePositions(direction);
}

console.log(tailPositions.size);
