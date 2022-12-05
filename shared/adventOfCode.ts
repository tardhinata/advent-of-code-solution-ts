
export abstract class AdventOfCode {
  protected abstract input: Array<any> | any;
  protected abstract result: string | number;
  /**
   * Process the input files.
   * @param {string} inputPath default is "p{part_number}.input" file in the problem directory
   * @param {string} resultPath default is "p{part_number}.result" file in the problem directory
   * @protected
   */
  protected abstract processInput(inputPath: string, resultPath: string): void;
  protected abstract part1(): string | number;
  protected abstract part2(): string | number;

  public start() {
    const args = process.argv.slice(2);
    const part = args[0] || '1';
    const sourcePath = args[1] || `p${part}.input`;
    const resultPath = `p${part}.result`;

    this.processInput(sourcePath, resultPath);

    const output = part === '1' ? this.part1() : this.part2();
    console.debug('Solution', output);

    if (args.length < 2) { //second argument is the real input source, thus if provided, no need to print the expected result.
      console.debug('Expected', this.result);
      if (this.result === output) {
        console.log(`Passed!`);
      } else {
        console.log(`Failed!`);
      }
    }
  }
}