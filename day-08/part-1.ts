#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';

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

function checkVisibility(numbers: number[]) {
  const [checkedTree, ...line] = numbers;
  assert(typeof checkedTree === 'number');
  return line.every((tree) => tree < checkedTree);
}

function isVisible(row: number, column: number): boolean {
  for (const g of [up, down, left, right]) {
    const numbers = [...g(row, column)];
    if (checkVisibility(numbers)) return true;
  }
  return false;
}

let result = 0;
// eslint-disable-next-line unicorn/no-for-loop
for (let row = 0; row < grid.length; row += 1) {
  const gridRow = grid[row];
  assert(gridRow);
  for (let column = 0; column < gridRow.length; column += 1) {
    if (isVisible(row, column)) result += 1;
  }
}

console.log(result);
