/**
 * Solution for https://adventofcode.com/2022/day/1
 */

import fs from 'fs';

class Day1 {
	private input: Array<Array<number>> = [];
	private result: number | undefined;

	/**
	 * Process the input files.
	 * @param {string} inputPath default is "p{part number}.input" file in the problem directory
	 * @param {string} resultPath default is "p{part number}.result" file in the problem directory
	 * @protected
	 */
	private processInput(inputPath: string, resultPath: string): void {
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

	public start() {
		const args = process.argv.slice(2);
		const part = args[0] || '1';
		const sourcePath = args[1] || `p${part}.input`;
		const resultPath = `p${part}.result`;

		this.processInput(sourcePath, resultPath);

		const output = part === '1' ? this.part1() : this.part2();
		console.debug('Solution', output);

		if (args.length < 2) { //second argument is to pass the real data source, thus no need to print the test result.
			console.debug('Expected', this.result);
			if (this.result === output) {
				console.log(`Passed!`);
			} else {
				console.log(`Failed!`);
			}
		}
	}

	private part1(): number {
		return this.input.reduce((acc, group) => {
			const currCalories = group.reduce((acc, cur) => acc + cur, 0); //summarize all calories per elf
			return Math.max(currCalories, acc); //return the biggest number
		}, 0);
	}

	private part2(): number {
		return this.input.map(group => group.reduce((acc, cur) => acc + cur, 0)) //summarize all calories per elf
			.sort((a, b) => b - a) //sort ascending from big to low
			.slice(0, 3) //take the top 3
			.reduce((acc, cur) => acc + cur, 0); //summarize the top 3
	}
}

new Day1().start();