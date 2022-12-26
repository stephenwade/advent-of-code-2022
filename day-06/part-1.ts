#!/usr/bin/env node -r @swc-node/register

import { readInput } from '~/util/read-input';

const input = readInput(__dirname);

function findStartOfPacket() {
  for (let i = 4; i < input.length; i += 1) {
    if (new Set(input.slice(i - 4, i)).size === 4) {
      return i;
    }
  }
}

console.log(findStartOfPacket());
