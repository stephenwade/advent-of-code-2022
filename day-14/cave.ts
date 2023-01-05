type PointString = `${number},${number}`;

export class Point {
  constructor(public x: number, public y: number) {}

  static fromPoint(point: Point) {
    return new Point(point.x, point.y);
  }

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  toString(): PointString {
    return `${this.x},${this.y}`;
  }

  static toString(x: number, y: number): PointString {
    return `${x},${y}`;
  }
}

enum P {
  Rock = '#',
  Sand = 'o',
  Empty = '.',
  Source = '+',
}

const SAND_SOURCE = new Point(500, 0);

const ESC = '\u001B';
const CLEAR_SCREEN = `${ESC}[2J`;
const CURSOR_HOME = `${ESC}[H`;

export class Cave {
  private board: Map<PointString, P> = new Map();

  private smallestX = Number.POSITIVE_INFINITY;
  private largestX = Number.NEGATIVE_INFINITY;
  private smallestY = Number.POSITIVE_INFINITY;
  private largestY = Number.NEGATIVE_INFINITY;

  constructor(lines: Iterable<Iterable<Point>>) {
    this.set(SAND_SOURCE, P.Source);

    for (const line of lines) {
      for (const rock of line) {
        this.set(rock, P.Rock);
      }
    }
  }

  set(point: Point, value: P) {
    this.board.set(point.toString(), value);

    this.smallestX = Math.min(this.smallestX, point.x);
    this.largestX = Math.max(this.largestX, point.x);
    this.smallestY = Math.min(this.smallestY, point.y);
    this.largestY = Math.max(this.largestY, point.y);
  }

  log(): void {
    let line = `${CLEAR_SCREEN}${CURSOR_HOME}`;
    for (let y = this.smallestY; y <= this.largestY; y += 1) {
      for (let x = this.smallestX; x <= this.largestX; x += 1) {
        line += this.board.get(Point.toString(x, y)) ?? P.Empty;
      }
      console.log(line);
      line = '';
    }
  }
}
