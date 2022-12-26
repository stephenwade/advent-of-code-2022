#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';

const inputText = readInput(__dirname);

type OutputLine =
  | { type: 'cd'; location: string }
  | { type: 'ls' }
  | { type: 'result'; name: string; dir: true }
  | { type: 'result'; name: string; size: number };

function parseLine(input: string): OutputLine {
  if (input.startsWith('$ cd')) {
    return { type: 'cd', location: input.slice(5) };
  }

  if (input === '$ ls') {
    return { type: 'ls' };
  }

  if (input.startsWith('dir')) {
    return { type: 'result', dir: true, name: input.slice(4) };
  }

  assert.match(input, /^\d+/u);
  const [size, name] = input.split(' ');
  return { type: 'result', size: Number(size), name };
}

const lines = inputText.split('\n').map(parseLine);

type File = {
  name: string;
  size: number;
};
type Directory = {
  parent?: Directory;
  name: string;
  contents: (Directory | File)[];
};

const root: Directory = {
  name: '/',
  contents: [],
};

// Discard '$ cd /'
const cdRoot = lines.shift();
assert.deepEqual(cdRoot, { type: 'cd', location: '/' } satisfies OutputLine);

let currentDirectory: Directory = root;

// Build tree
for (const line of lines) {
  if (line.type === 'cd') {
    if (line.location === '..') {
      const newDirectory = currentDirectory.parent;
      assert(newDirectory);
      currentDirectory = newDirectory;
    } else {
      const newDirectory = currentDirectory.contents.find<Directory>(
        (child): child is Directory =>
          'contents' in child && child.name === line.location
      );
      assert(newDirectory);
      currentDirectory = newDirectory;
    }
  }

  if (line.type === 'ls') continue;

  if (line.type === 'result') {
    if ('dir' in line) {
      currentDirectory.contents.push({
        parent: currentDirectory,
        name: line.name,
        contents: [],
      });
    } else {
      currentDirectory.contents.push({
        name: line.name,
        size: line.size,
      });
    }
  }
}

function directorySize(directory: Directory): number {
  return directory.contents.reduce((acc, item) => {
    if ('contents' in item) {
      return acc + directorySize(item);
    }
    return acc + item.size;
  }, 0);
}

function* allDirectories(directory: Directory): Generator<Directory> {
  for (const item of directory.contents) {
    if ('contents' in item) {
      yield item;
      for (const directory of allDirectories(item)) yield directory;
    }
  }
}

const TOTAL_DISK_SPACE = 70_000_000;
const UNUSED_SPACE_REQUIRED = 30_000_000;

const usedSpace = directorySize(root);
const unusedSpace = TOTAL_DISK_SPACE - usedSpace;
const needToDelete = UNUSED_SPACE_REQUIRED - unusedSpace;

console.log(
  [...allDirectories(root)]
    .map(directorySize)
    .sort((a, b) => a - b)
    .find((size) => size >= needToDelete)
);
