/**
 * Solution for https://adventofcode.com/2022/day/2
 */

import fs from 'fs';
import { AdventOfCode } from '../../shared/adventOfCode';

enum Hand {
	ROCK = 1,
	PAPER = 2,
	SCISSOR = 3,
}
enum Result {
	WIN = 6,
	DRAW = 3,
	LOSE = 0
}

class Day2 extends AdventOfCode {
	protected input: Array<any> = [];
	protected result: number = 0;

	protected processInput(inputPath: string, resultPath: string): void {
		this.input = fs.readFileSync(inputPath, 'utf8')
			.split('\n')
			.map(line => {
				const split = line.split(' ');
				const vs = (split[0]).trim();
				const me = (split[1]).trim();
				return {
					vs: vs === 'A' ? Hand.ROCK : vs === 'B' ? Hand.PAPER : Hand.SCISSOR,
					me: me === 'X' ? Hand.ROCK : me === 'Y' ? Hand.PAPER : Hand.SCISSOR,
				};
		});

		this.result = parseInt(fs.readFileSync(resultPath, 'utf8').trim());
	}

	protected part1(): number {
		let score = 0;
		this.input.forEach(game => {
			if (game.vs === Hand.ROCK) {
				if (game.me === Hand.ROCK) {
					score += Result.DRAW + game.me;
				} else if (game.me === Hand.PAPER) {
					score += Result.WIN + game.me;
				} else if (game.me === Hand.SCISSOR) {
					score += Result.LOSE + game.me;
				}
			} else if (game.vs === Hand.PAPER) {
				if (game.me === Hand.ROCK) {
					score += Result.LOSE + game.me;
				} else if (game.me === Hand.PAPER) {
					score += Result.DRAW + game.me;
				} else if (game.me === Hand.SCISSOR) {
					score += Result.WIN + game.me;
				}
			} else if (game.vs === Hand.SCISSOR) {
				if (game.me === Hand.ROCK) {
					score += Result.WIN + game.me;
				} else if (game.me === Hand.PAPER) {
					score += Result.LOSE + game.me;
				} else if (game.me === Hand.SCISSOR) {
					score += Result.DRAW + game.me;
				}
			}
		});
		return score;
	}

	protected part2(): number {
		let score = 0;
		this.input.forEach(game => {
			if (game.vs === Hand.ROCK) {
				if (game.me === Hand.ROCK) {
					score += Result.LOSE + Hand.SCISSOR;
				} else if (game.me === Hand.PAPER) {
					score += Result.DRAW + Hand.ROCK;
				} else if (game.me === Hand.SCISSOR) {
					score += Result.WIN + Hand.PAPER;
				}
			} else if (game.vs === Hand.PAPER) {
				if (game.me === Hand.ROCK) {
					score += Result.LOSE + Hand.ROCK;
				} else if (game.me === Hand.PAPER) {
					score += Result.DRAW + Hand.PAPER;
				} else if (game.me === Hand.SCISSOR) {
					score += Result.WIN + Hand.SCISSOR;
				}
			} else if (game.vs === Hand.SCISSOR) {
				if (game.me === Hand.ROCK) {
					score += Result.LOSE + Hand.PAPER;
				} else if (game.me === Hand.PAPER) {
					score += Result.DRAW + Hand.SCISSOR;
				} else if (game.me === Hand.SCISSOR) {
					score += Result.WIN + Hand.ROCK;
				}
			}
		});
		return score;
	}
}

new Day2().start();