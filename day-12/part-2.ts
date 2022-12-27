#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';

import * as dijkstra from './dijkstra';

const inputText = readInput(__dirname);

type Location = { x: number; y: number };
function locationStr({ x, y }: Location) {
  return `${x},${y}`;
}

type Cell = {
  height: number;
  connections: Location[];
};

const terrainMap: Cell[][] = [];
let end: Location | undefined;

for (const line of inputText.split('\n')) {
  const row: Cell[] = [];

  for (const char of line) {
    let height: number;

    if (char === 'S') {
      height = 0;
    } else if (char === 'E') {
      height = 25;
      end = { x: row.length, y: terrainMap.length };
    } else {
      height = char.charCodeAt(0) - 97;
      assert(height >= 0 && height <= 25);
    }

    row.push({ height, connections: [] });
  }

  terrainMap.push(row);
}

assert(end);

for (let y = 0; y < terrainMap.length; y += 1) {
  for (let x = 0; x < terrainMap[y].length; x += 1) {
    const cell = terrainMap[y][x];

    if (y > 0 && terrainMap[y - 1][x]) {
      const up = terrainMap[y - 1][x];
      if (up.height - cell.height <= 1) {
        cell.connections.push({ x: x, y: y - 1 });
      }
    }
    if (x > 0) {
      const left = terrainMap[y][x - 1];
      if (left.height - cell.height <= 1) {
        cell.connections.push({ x: x - 1, y: y });
      }
    }
    if (x < terrainMap[y].length - 1) {
      const right = terrainMap[y][x + 1];
      if (right.height - cell.height <= 1) {
        cell.connections.push({ x: x + 1, y: y });
      }
    }
    if (y < terrainMap.length - 1) {
      const down = terrainMap[y + 1][x];
      if (down.height - cell.height <= 1) {
        cell.connections.push({ x: x, y: y + 1 });
      }
    }
  }
}

type Graph = Record<string, Record<string, 1>>;

/**
 * Example:
 *
 * ```ts
 * const graph = {
 *   "0,0": { "0,1": 1, "1,0": 1 },
 *   "0,1": { "0,0": 1, "0,2": 1, "1,1": 1 },
 *   "0,2": { "0,1": 1, "1,2": 1 },
 *   "1,0": { "0,0": 1, "1,1": 1, "2,0": 1 },
 *   "1,1": { "0,1": 1, "1,0": 1, "1,2": 1, "2,1": 1 },
 *   "1,2": { "0,2": 1, "1,1": 1, "2,2": 1 },
 *   "2,0": { "1,0": 1, "2,1": 1 },
 *   "2,1": { "1,1": 1, "2,0": 1, "2,2": 1 },
 *   "2,2": { "1,2": 1, "2,1": 1 }
 * };
 * ```
 */
const graph: Graph = {};

for (const [y, row] of terrainMap.entries()) {
  for (const [x, cell] of row.entries()) {
    graph[locationStr({ x, y })] = Object.fromEntries(
      cell.connections.map((c) => [locationStr(c), 1])
    );
  }
}

let smallestSolution = Number.POSITIVE_INFINITY;
// eslint-disable-next-line unicorn/no-for-loop
for (let y = 0; y < terrainMap.length; y += 1) {
  for (let x = 0; x < terrainMap[y].length; x += 1) {
    if (terrainMap[y][x].height === 0) {
      try {
        smallestSolution = Math.min(
          smallestSolution,
          dijkstra.findPath(graph, locationStr({ x, y }), locationStr(end))
            .length - 1
        );
      } catch {
        // ignore errors
      }
    }
  }
}

console.log(smallestSolution);
