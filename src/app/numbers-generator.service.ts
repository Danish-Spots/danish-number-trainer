import { Injectable } from '@angular/core';
import { Answer } from './answer.interface';
import { danishNumberDict, danishNumbers } from './numbers';
import { DanishNumber } from './numbers.interface';

@Injectable({
  providedIn: 'root',
})
export class NumbersGeneratorService {
  constructor() {}

  buildNumberString() {
    const test = 1843433;
    console.log();
    const splitNumbers = test.toString().split(/(?=(?:...)*$)/);
    console.log(splitNumbers);
    const buildArray: DanishNumber[] = [];
    let outputNumber: DanishNumber = {
      name: '',
      number: 0,
    };
    let iterationCount = 100; // not really iteration count
    if (splitNumbers) {
      for (const numGroup of splitNumbers.reverse()) {
        const res = this.createGroupNameString(+numGroup, iterationCount);
        if (iterationCount !== 100) {
          const place = danishNumberDict[iterationCount];
          res.name += ' ' + place.name;
          res.number = res.number * place.number;
          iterationCount = iterationCount * 1000;
        } else if (iterationCount === 100) {
          iterationCount = iterationCount * 10;
        }
        buildArray.push(res);
      }
    }

    buildArray.reverse().forEach((d) => {
      outputNumber.name += d.name + ' ';
      outputNumber.number += d.number;
    });
    console.log(outputNumber);
  }

  private createGroupNameString(
    numGroup: number,
    iterationCount: number
  ): DanishNumber {
    if (numGroup <= 99) {
      console.log(numGroup);
      if (iterationCount > 100 && numGroup === 1) {
        const newNum: DanishNumber = {
          number: 1,
          name: danishNumberDict[iterationCount].gender ?? 'en',
        };
        return newNum;
      }
      return danishNumberDict[numGroup];
    } else if (numGroup === 100) {
      return {
        name: 'et hundrede',
        number: 100,
      };
    } else {
      let hundredsName = '';
      const tens = numGroup % 100; // will be 0 if numGroup === 200, 300, etc
      const hundreds = (numGroup - tens) / 100; // will always be between 1 to 9
      hundredsName = danishNumberDict[hundreds].name;
      if (hundreds === 1) {
        hundredsName = 'et'; //needed because it is et hundrede and not en hundrede
      }
      const resultNumber: DanishNumber = {
        name:
          hundredsName +
          ' ' +
          danishNumberDict[100].name +
          ' ' +
          danishNumberDict[tens].name,
        number: numGroup,
      };
      return resultNumber;
    }
  }

  /**
   * random int function from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   * @param max max number you want to get, exclusive
   * @returns integer between 0 inclusive and max exclusive
   */
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
