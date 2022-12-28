#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';

const inputText = readInput(__dirname);

const [stacksText, instructionsText] = inputText.split('\n\n');
assert(stacksText);
assert(instructionsText);

type Stacks = Record<string, string[]>;

function parseStacks(input: string): Stacks {
  const stacksLines = input.split('\n');
  const firstLine = stacksLines[0];
  assert(firstLine);
  const stacksCount = (firstLine.length + 1) / 4;

  const stackArrays: string[][] = [];
  for (let i = 0; i < stacksCount; i += 1) {
    stackArrays.push([]);
  }

  for (const line of stacksLines) {
    for (let i = 0; i < stacksCount; i += 1) {
      const item = line.slice(i * 4 + 1, i * 4 + 2);
      const thisArray = stackArrays[i];
      assert(thisArray);
      thisArray.push(item);
    }
  }

  const result: Stacks = {};

  for (const stackArray of stackArrays) {
    const label = stackArray.pop();
    assert(label);

    result[label] = stackArray.filter((x) => x !== ' ').reverse();
  }

  return result;
}

const stacks = parseStacks(stacksText);

type Instruction = {
  move: number;
  from: string;
  to: string;
};

function parseInstruction(input: string): Instruction {
  const matchResult = input.match(/move (\d+) from (\w+) to (\w+)/u);
  assert(matchResult);

  const [, moveStr, from, to] = matchResult;
  return {
    move: Number(moveStr),
    from: from as string,
    to: to as string,
  };
}

const instructions = instructionsText.split('\n').map(parseInstruction);

for (const { move, from, to } of instructions) {
  const stackFrom = stacks[from];
  assert(stackFrom);
  const crates = stackFrom.slice(-move);

  stacks[from] = stackFrom.slice(0, -move);
  const stackTo = stacks[to];
  assert(stackTo);
  stackTo.push(...crates);
}

console.log(
  Object.values(stacks)
    .map((stack) => stack.pop())
    .join('')
);
