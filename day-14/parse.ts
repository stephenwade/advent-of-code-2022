import * as assert from 'node:assert';

import { Point } from './cave';

export function parseLine(input: string): Point[] {
  const pointsText = input.split(' -> ');
  return pointsText.map((pointText) => {
    const [x, y] = pointText.split(',').map(Number);
    assert(x !== undefined);
    assert(y !== undefined);
    return new Point(x, y);
  });
}

function* pairwise<T>(input: T[]): Generator<[T, T]> {
  while (input.length >= 2) {
    const first = input.shift() as T;
    const second = input[0] as T;
    yield [first, second];
  }
}

export function* getPointsFromLine(line: Point[]): Generator<Point> {
  const first = line[0];
  assert(first);
  yield first;

  for (const [begin, end] of pairwise(line)) {
    const current = Point.fromPoint(begin);

    while (!current.equals(end)) {
      current.x += Math.sign(end.x - current.x);
      current.y += Math.sign(end.y - current.y);
      yield Point.fromPoint(current);
    }
  }
}
