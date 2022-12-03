/**
 * Solution for https://adventofcode.com/2022/day/3
 */

import fs from 'fs';
import { AdventOfCode } from '../../shared/adventOfCode';

class Day3 extends AdventOfCode {
	protected input: Array<Array<Array<string>>> = [];
	protected result: number = 0;

	protected processInput(inputPath: string, resultPath: string): void {
		this.input = fs.readFileSync(inputPath, 'utf8')
			.split('\n')
			.map(line => {
				const item1 = line.trim().slice(0, line.length/2).split('');
				const item2 = line.trim().slice(line.length/2, line.length).split('');
				return [item1, item2];
		});

		this.result = parseInt(fs.readFileSync(resultPath, 'utf8').trim());
	}

	private getPrio(char: string): number {
		return char.charCodeAt(0) - (char.toLowerCase() === char ? 96 : (64 - 26))
	}

	protected part1(): number {
		return this.input.reduce((acc, rucksack) => {
			const commonChar = rucksack[0].find((a) => rucksack[1].find(b => b === a)) || '';
			return acc + this.getPrio(commonChar);
		}, 0);
	}

	protected part2(): number {
		const group = [];
		for (let i=0; i < this.input.length; i+=3){
			group.push(this.input.slice(i, i+3).map(input => input[0].concat(input[1])));
		}
		return group.reduce((acc, elf) => {
			const commonChar = elf[0].find((a) => elf[1].find(b => b === a) && elf[2].find(c => c === a)) || '';
			return acc + this.getPrio(commonChar);
		}, 0);
	}
}

new Day3().start();