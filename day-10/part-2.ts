#!/usr/bin/env node -r @swc-node/register

import { readInput } from '~/util/read-input';

import { CPU } from './cpu';
import { parseInstruction } from './instruction';

const inputText = readInput(__dirname);

const instructions = inputText.split('\n').map(parseInstruction);

const LINE_LENGTH = 40;

const cpu = new CPU();

let currentLine = '';

cpu.on('duringCycle', (cycle, x) => {
  const linePosition = cycle % LINE_LENGTH;

  currentLine += [x, x + 1, x + 2].includes(linePosition) ? '##' : '  ';

  if (linePosition % LINE_LENGTH === 0) {
    console.log(currentLine);
    currentLine = '';
  }
});

for (const instruction of instructions) {
  cpu.do(instruction);
}
