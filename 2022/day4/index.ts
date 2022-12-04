/**
 * Solution for https://adventofcode.com/2022/day/4
 */

import fs from 'fs';
import { AdventOfCode } from '../../shared/adventOfCode';

class Day3 extends AdventOfCode {
	protected input: Array<{ elf1: number[], elf2: number[] }> = [];
	protected result: number = 0;

	protected processInput(inputPath: string, resultPath: string): void {
		this.input = fs.readFileSync(inputPath, 'utf8')
			.split('\n')
			.map(line => {
				const getSections = (range: string) => {
					let pair = range.split('-').map(elf => parseInt(elf));
					let sections: number[] = [];
					for(let i=pair[0]; i<=pair[1]; i++){
						sections.push(i);
					}
					return sections;
				}
				const pairs = line.trim().split(',');
				return {
					elf1: getSections(pairs[0]),
					elf2: getSections(pairs[1])
				};
		});

		this.result = parseInt(fs.readFileSync(resultPath, 'utf8').trim());
	}

	protected part1(): number {
		return this.input.reduce((acc, pair) => {
			return pair.elf1.every(a => pair.elf2.find(b => b === a)) || pair.elf2.every(a => pair.elf1.find(b => b === a)) ? acc+1 : acc;
		}, 0);
	}

	protected part2(): number {
		return this.input.reduce((acc, pair) => {
			return pair.elf1.find(a => pair.elf2.find(b => b === a)) || pair.elf2.find(a => pair.elf1.find(b => b === a)) ? acc+1 : acc;
		}, 0);
	}
}

new Day3().start();