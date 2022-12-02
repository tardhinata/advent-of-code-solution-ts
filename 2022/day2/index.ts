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

	private getNormalGameResult(vs: Hand, me: Hand): Result | undefined {
		if (vs === me) {
			return Result.DRAW;
		}
		if (me === Hand.ROCK) {
			return vs === Hand.SCISSOR ? Result.WIN : Result.LOSE;
		} else if (me === Hand.PAPER) {
			return vs === Hand.ROCK ? Result.WIN : Result.LOSE;
		} else if (me === Hand.SCISSOR) {
			return vs === Hand.PAPER ? Result.WIN : Result.LOSE;
		}
	}

	protected part1(): number {
		return this.input.reduce((acc, game) => {
			return acc + this.getNormalGameResult(game.vs, game.me) + game.me;
		}, 0);
	}

	protected part2(): number {
		return this.input.reduce((acc, game) => {
			if (game.me === Hand.ROCK) {
				return acc + Result.LOSE + (game.vs === Hand.ROCK ? Hand.SCISSOR : game.vs === Hand.PAPER ? Hand.ROCK : Hand.PAPER);
			} else if (game.me === Hand.PAPER) {
				return acc + Result.DRAW + game.vs;
			} else if (game.me === Hand.SCISSOR) {
				return acc + Result.WIN + (game.vs === Hand.ROCK ? Hand.PAPER : game.vs === Hand.PAPER ? Hand.SCISSOR : Hand.ROCK);
			}
		}, 0);
	}
}

new Day2().start();