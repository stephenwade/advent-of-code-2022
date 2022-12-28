#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';
import { product } from '~/util/reducers';

const inputText = readInput(__dirname);

const grid: number[][] = inputText
  .split('\n')
  .map((line) => [...line].map(Number));

function* up(row: number, column: number): Generator<number> {
  const gridRow = grid[row];
  assert(gridRow);
  for (let i = column; i >= 0; i -= 1) {
    const result = gridRow[i];
    assert(result !== undefined);
    yield result;
  }
}

function* down(row: number, column: number): Generator<number> {
  const gridRow = grid[row];
  assert(gridRow);
  for (let i = column; i < gridRow.length; i += 1) {
    const result = gridRow[i];
    assert(result !== undefined);
    yield result;
  }
}

function* left(row: number, column: number): Generator<number> {
  for (let i = row; i >= 0; i -= 1) {
    const gridRow = grid[i];
    assert(gridRow);
    const result = gridRow[column];
    assert(result !== undefined);
    yield result;
  }
}

function* right(row: number, column: number): Generator<number> {
  for (let i = row; i < grid.length; i += 1) {
    const gridRow = grid[i];
    assert(gridRow);
    const result = gridRow[column];
    assert(result !== undefined);
    yield result;
  }
}

function countTrees(numbers: number[]) {
  const [checkedTree, ...line] = numbers;
  assert(typeof checkedTree === 'number');

  let result = 0;
  for (const tree of line) {
    result += 1;
    if (tree >= checkedTree) break;
  }
  return result;
}

function scenicScore(row: number, column: number): number {
  return [up, down, left, right]
    .map((g) => countTrees([...g(row, column)]))
    .reduce(product);
}

let largestScore = 0;
// eslint-disable-next-line unicorn/no-for-loop
for (let row = 0; row < grid.length; row += 1) {
  const gridRow = grid[row];
  assert(gridRow);
  for (let column = 0; column < gridRow.length; column += 1) {
    const score = scenicScore(row, column);
    largestScore = Math.max(score, largestScore);
  }
}

console.log(largestScore);
