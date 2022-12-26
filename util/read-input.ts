import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function readInput(dirname: string) {
  return readFileSync(join(dirname, 'input.txt'), 'utf8');
}
