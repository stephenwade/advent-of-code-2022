#!/usr/bin/env node -r @swc-node/register

import { readInput } from '~/util/read-input';

const input = readInput(__dirname);

function findStartOfMessage() {
  for (let i = 14; i < input.length; i += 1) {
    if (new Set(input.slice(i - 14, i)).size === 14) {
      return i;
    }
  }
}

console.log(findStartOfMessage());
