#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';
import { sum } from '~/util/reducers';
import { intersection } from '~/util/sets';

const inputText = readInput(__dirname);

type Rucksack = {
  left: string;
  right: string;
};

function parse(input: string): Rucksack {
  assert.match(input, /^[A-Za-z]+/u);

  const compartmentLength = input.length / 2;
  assert(Number.isInteger(compartmentLength));

  return {
    left: input.slice(0, compartmentLength),
    right: input.slice(compartmentLength),
  };
}

const rucksacks = inputText.split('\n').map(parse);

function findCommonItem({ left, right }: Rucksack): string {
  const commonItems = intersection(left, right);

  assert.equal(commonItems.length, 1);
  return commonItems[0] as string;
}

const a = 'a'.charCodeAt(0);
const A = 'A'.charCodeAt(0);

function priority(item: string): number {
  if (item >= 'a' && item <= 'z') {
    return item.charCodeAt(0) - a + 1;
  }

  if (item >= 'A' && item <= 'Z') {
    return item.charCodeAt(0) - A + 27;
  }

  throw new Error('Invalid item');
}

console.log(rucksacks.map(findCommonItem).map(priority).reduce(sum));
