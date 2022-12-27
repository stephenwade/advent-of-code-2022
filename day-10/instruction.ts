export type Instruction = { type: 'addx'; value: number } | { type: 'noop' };

export function parseInstruction(line: string): Instruction {
  if (line.startsWith('addx')) {
    const [, valueText] = line.split(' ');
    return { type: 'addx', value: Number(valueText) };
  }

  if (line === 'noop') {
    return { type: 'noop' };
  }

  throw new Error('Invalid input');
}
