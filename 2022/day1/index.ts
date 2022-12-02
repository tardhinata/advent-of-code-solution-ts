/**
 * Solution for https://adventofcode.com/2022/day/1
 */

import fs from 'fs';
import { AdventOfCode } from '../../shared/adventOfCode';

class Day1 extends AdventOfCode {
	protected input: Array<Array<number>> = [];
	protected result: number = 0;

	protected processInput(inputPath: string, resultPath: string): void {
		let tempGroup: Array<number> = [];
		fs.readFileSync(inputPath, 'utf8')
			.split('\n')
			.forEach((line: string) => {
				if ((line || '').trim() === '') {
					this.input.push(tempGroup);
					tempGroup = [];
				} else {
					tempGroup.push(parseInt(line));
				}
			});
		this.input.push(tempGroup); //push the last tempGroup

		this.result = parseInt(fs.readFileSync(resultPath, 'utf8').trim());
	}

	protected part1(): number {
		return this.input.reduce((acc, currGroup) => {
			const currCalories = currGroup.reduce((acc, cal) => acc + cal, 0); //summarize all calories per elf
			return Math.max(currCalories, acc); //return the biggest number
		}, 0);
	}

	protected part2(): number {
		return this.input.map(group => group.reduce((acc, cal) => acc + cal, 0)) //summarize all calories per elf
			.sort((a, b) => b - a) //sort ascending from big to low
			.slice(0, 3) //take the top 3
			.reduce((acc, cur) => acc + cur, 0); //summarize the top 3
	}
}

new Day1().start();