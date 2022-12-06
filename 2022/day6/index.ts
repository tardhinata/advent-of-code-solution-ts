/**
 * Solution for https://adventofcode.com/2022/day/6
 */

import fs from 'fs';
import { AdventOfCode } from '../../shared/adventOfCode';

class Day6 extends AdventOfCode {
  protected input: Array<string> = [];
  protected result: number = 0;

  protected processInput(inputPath: string, resultPath: string): void {
    this.input = fs.readFileSync(inputPath, 'utf8').trim().split('');
    this.result = parseInt(fs.readFileSync(resultPath, 'utf8').trim());
  }

  private findMarker(markerLength: number): number {
    return this.input.findIndex((char, idx) => {
      if (idx >= markerLength) {
        const marker = this.input.slice(idx - markerLength, idx);
        return marker.length === new Set(marker).size;
      }
    });
  }

  protected part1(): number {
    return this.findMarker(4);
  }

  protected part2(): number {
    return this.findMarker(14);
  }
}

new Day6().start();