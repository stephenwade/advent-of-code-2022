#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';
import { sum } from '~/util/reducers';
import { intersection } from '~/util/sets';

const inputText = readInput(__dirname);

const rucksacks = inputText.split('\n');

function* getRucksackGroups(): Generator<[string, string, string]> {
  assert.equal(rucksacks.length % 3, 0);

  for (let i = 0; i < rucksacks.length; i += 3) {
    yield [rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]];
  }
}

function findCommonItem(group: [string, string, string]): string {
  const commonItems = intersection(intersection(group[0], group[1]), group[2]);

  assert.equal(commonItems.length, 1);
  return commonItems[0];
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

console.log(
  [...getRucksackGroups()].map(findCommonItem).map(priority).reduce(sum)
);
