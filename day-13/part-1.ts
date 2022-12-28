#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';

const inputText = readInput(__dirname);

type Node = number | Node[];
type Pair = [Node[], Node[]];

function validate(input: unknown): input is Node {
  if (typeof input === 'number') {
    return true;
  } else if (typeof input === 'object') {
    return Array.isArray(input) ? input.every((el) => validate(el)) : false;
  } else {
    return false;
  }
}

function parse(input: string): Pair {
  const result = input.split('\n').map((x) => JSON.parse(x) as Node[]) as Pair;

  assert(result.length === 2);
  assert(result.every((x) => Array.isArray(x) && validate(x)));

  return result;
}

const inputs = inputText.split('\n\n').map(parse);

function compare(left: Node, right: Node): -1 | 0 | 1 {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) return -1;
    if (left > right) return 1;
    return 0;
  }

  if (typeof left === 'number' && Array.isArray(right)) {
    left = [left];
  }

  if (Array.isArray(left) && typeof right === 'number') {
    right = [right];
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    for (const [i, leftValue] of left.entries()) {
      const rightValue = right[i];
      if (rightValue === undefined) {
        return 1;
      } else {
        const compareResult = compare(leftValue, rightValue);
        if (compareResult !== 0) return compareResult;
      }
    }
    if (right.length > left.length) {
      return -1;
    }
  }

  return 0;
}

let result = 0;

for (const [i, pair] of inputs.entries()) {
  const compareResult = compare(...pair);
  assert(compareResult);
  if (compareResult === -1) result += i + 1;
}

console.log(result);
