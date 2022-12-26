#!/usr/bin/env node -r @swc-node/register

import { readInput } from '~/util/read-input';

const inputText = readInput(__dirname);

const elves: number[] = [];
for (const elfLines of inputText.split('\n\n')) {
  elves.push(
    elfLines
      .split('\n')
      .map(Number)
      .reduce((acc, c) => acc + c, 0)
  );
}

elves.sort((a, b) => b - a);

console.log(elves.slice(0, 3).reduce((a, b) => a + b));
