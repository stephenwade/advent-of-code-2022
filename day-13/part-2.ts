#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';
import { product } from '~/util/reducers';

const inputText = readInput(__dirname);

type Node = number | Node[];
type Packet = Node[];

function validate(input: unknown): input is Node {
  if (typeof input === 'number') {
    return true;
  } else if (typeof input === 'object') {
    return Array.isArray(input) ? input.every((el) => validate(el)) : false;
  } else {
    return false;
  }
}

function parse(input: string): Packet {
  const result = JSON.parse(input) as unknown;

  assert(Array.isArray(result));
  assert(result.every((x) => validate(x)));

  return result as Node[];
}

const DIVIDER_PACKETS: Packet[] = [[[2]], [[6]]];

const inputs = [
  ...inputText.split('\n').filter(Boolean).map(parse),
  ...DIVIDER_PACKETS,
];

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

inputs.sort(compare);

const result = DIVIDER_PACKETS.map((p) => {
  const result =
    inputs.findIndex((input) => {
      try {
        assert.deepStrictEqual(input, p);
        return true;
      } catch {
        return false;
      }
    }) + 1;
  assert(result);
  return result;
}).reduce(product);

console.log(result);
