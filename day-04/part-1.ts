#!/usr/bin/env node -r @swc-node/register

import * as assert from 'node:assert';

import { readInput } from '~/util/read-input';

const inputText = readInput(__dirname);

type SectionAssignment = {
  lower: number;
  upper: number;
};

type SectionAssignmentPair = [SectionAssignment, SectionAssignment];

function parseAssignment(input: string): SectionAssignment {
  const [lower, upper] = input.split('-').map(Number);
  assert(typeof lower === 'number');
  assert(typeof upper === 'number');
  assert(!Number.isNaN(lower));
  assert(!Number.isNaN(upper));
  assert(lower <= upper);

  return { lower, upper };
}

function parse(input: string): SectionAssignmentPair {
  const result: SectionAssignment[] = input.split(',').map(parseAssignment);

  assert.equal(result.length, 2);
  return result as [SectionAssignment, SectionAssignment];
}

const assignmentPairs = inputText.split('\n').map(parse);

function pairsCompletelyOverlap([a, b]: SectionAssignmentPair): boolean {
  return (
    (a.lower <= b.lower && a.upper >= b.upper) ||
    (b.lower <= a.lower && b.upper >= a.upper)
  );
}

console.log(assignmentPairs.filter(pairsCompletelyOverlap).length);
