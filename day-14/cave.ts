type PointString = `${number},${number}`;

export class Point {
  constructor(public x: number, public y: number) {}

  static fromPoint(point: Point) {
    return new Point(point.x, point.y);
  }

  equals(other: Point): boolean;
  equals(x: number, y: number): boolean;

  equals(x: number | Point, y?: number): boolean {
    if (y === undefined && typeof x === 'object') {
      const other = x;
      return this.x === other.x && this.y === other.y;
    }

    if (x !== undefined && y !== undefined) {
      return this.x === x && this.y === y;
    }

    throw new TypeError('Invalid parameters');
  }

  toString(): PointString {
    return `${this.x},${this.y}`;
  }

  static toString(x: number, y: number): PointString {
    return `${x},${y}`;
  }
}

export enum P {
  Rock = '#',
  Sand = 'o',
  Empty = '.',
  Source = '+',
}

type CavePoint = Omit<P, P.Empty>;

export const SAND_SOURCE = new Point(500, 0);

const ESC = '\u001B';
const CLEAR_SCREEN = '';
const CURSOR_HOME = `${ESC}[H`;

const TOP = '\u2580';
const BOTTOM = '\u2584';
const BOTH = '\u2588';

export class Cave {
  private board: Map<PointString, CavePoint> = new Map();

  public smallestX = Number.POSITIVE_INFINITY;
  public largestX = Number.NEGATIVE_INFINITY;
  public smallestY = Number.POSITIVE_INFINITY;
  public largestY = Number.NEGATIVE_INFINITY;

  constructor(lines: Iterable<Iterable<Point>>) {
    this.set(SAND_SOURCE, P.Source);

    for (const line of lines) {
      for (const rock of line) {
        this.set(rock, P.Rock);
      }
    }
  }

  set(point: Point, value: CavePoint) {
    this.board.set(point.toString(), value);

    this.smallestX = Math.min(this.smallestX, point.x);
    this.largestX = Math.max(this.largestX, point.x);
    this.smallestY = Math.min(this.smallestY, point.y);
    this.largestY = Math.max(this.largestY, point.y);
  }

  get(x: number, y: number) {
    return this.board.get(Point.toString(x, y));
  }

  log(currentSand?: Point): void {
    const get = (x: number, y: number) => {
      if (currentSand?.equals(x, y)) return true;
      return this.get(x, y);
    };
    let line = `${CLEAR_SCREEN}${CURSOR_HOME}`;
    for (let y = this.smallestY; y <= this.largestY; y += 2) {
      for (let x = this.smallestX; x <= this.largestX; x += 1) {
        if (get(x, y) && get(x, y + 1)) line += BOTH;
        else if (get(x, y) && !get(x, y + 1)) line += TOP;
        else if (!get(x, y) && get(x, y + 1)) line += BOTTOM;
        else line += ' ';
      }
      console.log(line);
      line = '';
    }
  }
}
