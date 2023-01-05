#!/usr/bin/env node -r @swc-node/register

import { readInput } from '~/util/read-input';

import { Cave, P, Point, SAND_SOURCE } from './cave';
import { getPointsFromLine, parseLine } from './parse';

const inputText = readInput(__dirname);

const lines = inputText.split('\n').map(parseLine).map(getPointsFromLine);

const cave = new Cave(lines);

function dropSand(): void {
  const newSand: Point = Point.fromPoint(SAND_SOURCE);
  let settled = false;

  cave.log(newSand);

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

    if (newSand.y > cave.largestY) {
      throw new Error('the endless void approaches');
    }
  }
}

let count = 0;
try {
  while (true) {
    dropSand();
    count += 1;
  }
} catch {
  cave.log();
  console.log(count);
}
