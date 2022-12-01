Solution for [Advent of Code](https://adventofcode.com) event
====

All solutions are written in Typescript.   
It uses [ts-node](https://www.npmjs.com/package/ts-node) to compile and run the .ts file in nodejs.

Usage
====
1) Clone the repo and install all dependencies in the root dir.  
   ```bash
   > npm ci
   ```
2) Go to the solution directory, e.g. 2022/day1
   ```bash
   > cd 2022/day1
   ```
3) Run the solution for testing/development.  
   It will get the default input & expected output file in the solution directory.
   - Input file: _p[part_number].input_
   - Result file: _p[part_number].result_
   ```bash
   > npx ts-node [solution file] [part number, either 1 or 2]
   > npx ts-node index.ts 1
   ```
4) Run the solution to get the final answer.  
   You need to pass the final input file as the last argument.
   ```bash
   > npx ts-node [solution file] [part number, either 1 or 2] [input file]
   > npx ts-node index.ts 1 input.txt
   ```