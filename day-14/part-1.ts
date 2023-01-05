#!/usr/bin/env node -r @swc-node/register

import { readInput } from '~/util/read-input';

import { Cave } from './cave';
import { getPointsFromLine, parseLine } from './parse';

const inputText = readInput(__dirname);

const lines = inputText.split('\n').map(parseLine).map(getPointsFromLine);

const cave = new Cave(lines);

cave.log();
