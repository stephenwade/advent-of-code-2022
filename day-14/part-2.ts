#!/usr/bin/env node -r @swc-node/register

import { readInput } from '~/util/read-input';

import { Cave, P, Point, SAND_SOURCE } from './cave';
import { getPointsFromLine, parseLine } from './parse';

const inputText = readInput(__dirname);

const lines = inputText.split('\n').map(parseLine).map(getPointsFromLine);

const cave = new Cave(lines);

function addFloor() {
  const floorY = cave.largestY + 2;

  const height = cave.largestY - cave.smallestY;
  const floorLeft = SAND_SOURCE.x - height - 2;
  const floorRight = SAND_SOURCE.x + height + 2;
  for (const rock of getPointsFromLine([
    new Point(floorLeft, floorY),
    new Point(floorRight, floorY),
  ])) {
    cave.set(rock, P.Rock);
  }
}

addFloor();

function dropSand(show: boolean): void {
  const newSand: Point = Point.fromPoint(SAND_SOURCE);
  let settled = false;

  if (show) cave.log(newSand);

  while (!settled) {
    if (cave.get(newSand.x, newSand.y + 1) === undefined) {
      newSand.y += 1;
    } else if (cave.get(newSand.x - 1, newSand.y + 1) === undefined) {
      newSand.y += 1;
      newSand.x -= 1;
    } else if (cave.get(newSand.x + 1, newSand.y + 1) === undefined) {
      newSand.y += 1;
      newSand.x += 1;
    } else {
      cave.set(newSand, P.Sand);
      settled = true;
    }

    if (newSand.equals(SAND_SOURCE)) {
      throw new Error('the pyramid watches');
    }
  }
}

let count = 0;
try {
  while (true) {
    count += 1;
    dropSand(count % 10 === 0);
  }
} catch {
  cave.log();
  console.log(count);
}
