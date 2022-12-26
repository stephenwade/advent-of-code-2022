#!/usr/bin/env node -r @swc-node/register

import { readInput } from '~/util/read-input';

const inputText = readInput(__dirname);

const elves: number[][] = [];
for (const elfLines of inputText.split('\n\n')) {
  elves.push(elfLines.split('\n').map(Number));
}

let largestCalories = 0;
for (const elf of elves) {
  const calories = elf.reduce((acc, c) => acc + c, 0);
  largestCalories = Math.max(largestCalories, calories);
}

console.log(largestCalories);
