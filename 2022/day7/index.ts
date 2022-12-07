/**
 * Solution for https://adventofcode.com/2022/day/7
 */

import fs from 'fs';
import { AdventOfCode } from '../../shared/adventOfCode';

interface File {
  name: string,
  size: number
}

interface Folder {
  parent?: Folder,
  name: string,
  size: number,
  files: Array<File>,
  folders: Array<Folder>
}

class Day7 extends AdventOfCode {
  protected input: Folder = {name: '/', size: 0, files: [], folders: []};
  protected result: number = 0;

  private inputFlat: Array<Folder> = [this.input];

  private getFolder(currentFolder: Folder, folderName: string): Folder {
    if (folderName === '/') {
      return this.input;
    } else if (folderName === '..') {
      return currentFolder.parent ? currentFolder.parent : currentFolder;
    } else {
      const newFolder: Folder = {name: folderName, size: 0, parent: currentFolder, files: [], folders: []};
      currentFolder.folders.push(newFolder);
      this.inputFlat.push(newFolder);
      return newFolder;
    }
  }

  protected processInput(inputPath: string, resultPath: string): void {
    let currentFolder = this.input;
    fs.readFileSync(inputPath, 'utf8')
      .split('\n')
      .forEach(line => {
        const lines = line.trim().split(' ');
        const dirTarget = lines[0] === '$' && lines[1] === 'cd' ? lines[2] : null;
        if (dirTarget) {
          currentFolder = this.getFolder(currentFolder, dirTarget);
        } else if (lines[0] !== 'dir' && lines[1] !== 'ls') {
          const newFile: File = {
            name: lines[1],
            size: parseInt(lines[0])
          };
          currentFolder.files.push(newFile);
          currentFolder.size += newFile.size;

          let traverseParent = currentFolder.parent;
          while (traverseParent) {
            traverseParent.size += newFile.size;
            traverseParent = traverseParent.parent;
          }
        }
      });
    this.result = parseInt(fs.readFileSync(resultPath, 'utf8').trim());
  }

  protected part1(): number {
    return this.inputFlat
      .filter(f => f.size <= 100000)
      .reduce((acc, folder) => acc + folder.size, 0);
  }

  protected part2(): number {
    const requiredSpace = 30000000 - (70000000 - this.input.size);
    const toBeDeleted = this.inputFlat
      .sort((a, b) => a.size - b.size)
      .find(f => f.size >= requiredSpace) || this.input;
    return toBeDeleted.size;
  }
}

new Day7().start();