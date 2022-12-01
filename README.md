Solution for [Advent of Code](https://adventofcode.com) event
====

All solutions are written in Typescript.

Usage
====
1) Clone the repo and install all dependencies in the root dir
```bash
> npm ci
```
2) Go to the solution directory, e.g. 2022/day1
```bash
> cd 2022/day1
```
3) Run the solution for testing/development
- It will get the default input & expected output file in the solution directory
- Input file: "p[part_number].input"
- Result file: "p[part_number].result"
```bash
> npx [solution file] [part number, either 1 or 2]
> npx index.ts 1
```
4) Run the solution to get the final answer
- You need to pass the final input file as the last argument.
```bash
> npx [solution file] [part number, either 1 or 2] [input file]
> npx index.ts 1 input.txt
```