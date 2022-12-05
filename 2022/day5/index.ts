/**
 * Solution for https://adventofcode.com/2022/day/5
 */

import fs from 'fs';
import { AdventOfCode } from '../../shared/adventOfCode';

class Day5 extends AdventOfCode {
  protected input: {
    stacks: Map<number, string[]>,
    moves: Array<{ amount: number, from: number, to: number }>
  } = {stacks: new Map<number, string[]>(), moves: []};
  protected result: string = '';

  protected processInput(inputPath: string, resultPath: string): void {
    fs.readFileSync(inputPath, 'utf8')
      .split('\n')
      .forEach((line) => {
        const isCrates = line.includes('[');
        const isMove = line.includes('move');
        if (isCrates) {
          const lineCrates = line.split('');
          for (let i = 0; i < lineCrates.length; i += 4) {
            const stackId = i / 4 + 1;
            const stack = this.input.stacks.get(stackId) || [];
            const crate = lineCrates.slice(i, i + 4).join('').trim();
            if (crate) {
              stack.unshift(crate[1]);
            }
            this.input.stacks.set(stackId, stack);
          }
        } else if (isMove) {
          const move = line.split(' ').map(val => parseInt(val)).filter(val => !isNaN(val));
          this.input.moves.push({amount: move[0], from: move[1], to: move[2]});
        }
      });

    this.result = fs.readFileSync(resultPath, 'utf8').trim();
  }

  private moveCrates(isMultipleAtOnce: boolean) {
    this.input.moves.forEach(move => {
      const from = this.input.stacks.get(move.from) || [];
      const to = this.input.stacks.get(move.to) || [];
      const toBeMoved = from.splice(from.length - move.amount, move.amount);
      this.input.stacks.set(move.from, from);
      this.input.stacks.set(move.to, to.concat(isMultipleAtOnce ? toBeMoved : toBeMoved.reverse()));
    });
    return Array.from(this.input.stacks.values()).map(val => val.pop()).join('');
  }

  protected part1(): string {
    return this.moveCrates(false);
  }

  protected part2(): string {
    return this.moveCrates(true);
  }
}

new Day5().start();