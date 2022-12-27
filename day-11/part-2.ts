#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';
import { product } from '~/util/reducers';

const inputText = readInput(__dirname);

type Monkey = {
  items: number[];
  operation: (old: number) => number;
  testDivisibleBy: number;
  ifTrueMonkey: number;
  ifFalseMonkey: number;
  inspectionCount: number;
};

function parse(input: string, i: number): Monkey {
  const [
    monkeyIdText,
    itemsText,
    operationText,
    testText,
    ifTrueText,
    ifFalseText,
  ] = input.split('\n');

  assert.equal(monkeyIdText, `Monkey ${i}:`);

  assert(itemsText.startsWith('  Starting items: '));
  const items = itemsText.slice(18).split(', ').map(Number);

  assert(operationText.startsWith('  Operation: new = '));
  // eslint-disable-next-line unused-imports/no-unused-vars
  const operation = (old: number) => eval(operationText.slice(19)) as number;

  assert(testText.startsWith('  Test: divisible by '));
  const testDivisibleBy = Number(testText.slice(21));

  assert(ifTrueText.startsWith('    If true: throw to monkey '));
  const ifTrueMonkey = Number(ifTrueText.slice(29));
  assert.notEqual(ifTrueMonkey, i);

  assert(ifFalseText.startsWith('    If false: throw to monkey '));
  const ifFalseMonkey = Number(ifFalseText.slice(30));
  assert.notEqual(ifFalseMonkey, i);

  return {
    items,
    operation,
    testDivisibleBy,
    ifTrueMonkey,
    ifFalseMonkey,
    inspectionCount: 0,
  };
}

const monkeys = inputText.split('\n\n').map(parse);

const divisorProduct = monkeys.map((m) => m.testDivisibleBy).reduce(product);

function monkeyRound() {
  for (const monkey of monkeys) {
    for (let item of monkey.items) {
      item = monkey.operation(item);
      item = item % divisorProduct;

      monkeys[
        item % monkey.testDivisibleBy === 0
          ? monkey.ifTrueMonkey
          : monkey.ifFalseMonkey
      ].items.push(item);

      monkey.inspectionCount += 1;
    }

    monkey.items = [];
  }
}

for (let i = 0; i < 10_000; i++) {
  monkeyRound();
}

console.log(
  monkeys
    .map((m) => m.inspectionCount)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce(product)
);
