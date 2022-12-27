#!/usr/bin/env node -r @swc-node/register

import { readInput } from '~/util/read-input';

import { CPU } from './cpu';
import { parseInstruction } from './instruction';

const inputText = readInput(__dirname);

const instructions = inputText.split('\n').map(parseInstruction);

const TARGET_CYCLES = new Set([20, 60, 100, 140, 180, 220]);

const cpu = new CPU();

let totalSignalStrength = 0;

cpu.on('duringCycle', (cycle, x) => {
  if (TARGET_CYCLES.has(cycle)) {
    totalSignalStrength += cycle * x;
  }
});

for (const instruction of instructions) {
  cpu.do(instruction);
}

console.log(totalSignalStrength);
