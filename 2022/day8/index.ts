/**
 * Solution for https://adventofcode.com/2022/day/7
 */

import fs from 'fs';
import { AdventOfCode } from '../../shared/adventOfCode';

class Day7 extends AdventOfCode {
  protected input: Array<Array<number>> = [];
  protected result: number = 0;

  protected processInput(inputPath: string, resultPath: string): void {
    this.input = fs.readFileSync(inputPath, 'utf8')
      .split('\n')
      .map(line => line.trim().split('').map(l => parseInt(l)));
    this.result = parseInt(fs.readFileSync(resultPath, 'utf8').trim());
  }

  protected part1(): number {
    let visibleTrees: Array<number> = [];
    this.input.forEach((horizontalTrees, idx) => {
      if (idx === 0 || idx === this.input.length - 1) {
        visibleTrees = [...visibleTrees, ...horizontalTrees];
      } else {
        horizontalTrees.forEach((tree, idxCol) => {
          if (idxCol === 0 || idxCol === horizontalTrees.length - 1) {
            visibleTrees.push(tree);
          } else {
            const verticalTrees = Array.from({length: this.input.length}, (_, i) => this.input[i][idxCol]);
            const isVisible = (neighbor: number) => neighbor < tree;
            const top = verticalTrees.slice(0, idx).every(isVisible);
            const bottom = verticalTrees.slice(idx + 1, this.input.length).every(isVisible);
            const left = horizontalTrees.slice(0, idxCol).every(isVisible);
            const right = horizontalTrees.slice(idxCol + 1, horizontalTrees.length).every(isVisible);

            if (top || bottom || left || right) {
              visibleTrees.push(tree);
            }
          }
        });
      }
    });
    return visibleTrees.length;
  }

  protected part2(): number {
    const scenicScores: Array<number> = [];
    this.input.forEach((horizontalTrees, idx) => {
      horizontalTrees.forEach((tree, idxCol) => {
        const verticalTrees: Array<number> = Array.from({length: this.input.length}, (_, i) => this.input[i][idxCol]);
        const countScenicScore = (acc: number, curr: number, i: number, arr: Array<number>) => {
          if (curr >= tree) {
            arr.splice(1); // stop counting
          }
          return acc + 1;
        };

        const top = verticalTrees.slice(0, idx).reverse().reduce(countScenicScore, 0);
        const bottom = verticalTrees.slice(idx + 1, this.input.length).reduce(countScenicScore, 0);
        const left = horizontalTrees.slice(0, idxCol).reverse().reduce(countScenicScore, 0);
        const right = horizontalTrees.slice(idxCol + 1, horizontalTrees.length).reduce(countScenicScore, 0);

        scenicScores.push(top * bottom * left * right);
      });
    });
    return scenicScores.sort((a, b) => b - a)[0];
  }
}

new Day7().start();