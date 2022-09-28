import { Injectable } from '@angular/core';
import { Answer } from './answer.interface';
import { danishNumberDict, danishNumbers } from './numbers';
import { DanishNumber } from './numbers.interface';

@Injectable({
  providedIn: 'root',
})
export class NumbersGeneratorService {
  public hasGuessed = false;
  public selectedDanishNumbers: DanishNumber[] = [];
  public correctAnswerIndex: number = -1;
  public correctAnswer!: DanishNumber;
  public lowestNumber!: number;
  public highestNumber!: number;

  constructor() {}

  buildGuesses() {
    const numberOfChoices = 4;
    this.hasGuessed = false;
    this.selectedDanishNumbers = [];
    while (this.selectedDanishNumbers.length < numberOfChoices) {
      const num = this.getRandomInt(
        +this.lowestNumber,
        +this.highestNumber + 1
      );
      const danishNumber = this.buildNumberString(num);
      if (
        !this.selectedDanishNumbers.some(
          (d) => d.number === danishNumber.number
        )
      ) {
        this.selectedDanishNumbers.push(danishNumber);
      }
    }

    this.correctAnswerIndex = this.getRandomInt(
      0,
      this.selectedDanishNumbers.length
    );

    this.correctAnswer = this.selectedDanishNumbers[this.correctAnswerIndex];
  }

  buildNumberString(num: number): DanishNumber {
    const splitNumbers = num.toString().split(/(?=(?:...)*$)/);
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
    return outputNumber;
  }

  private createGroupNameString(
    numGroup: number,
    iterationCount: number
  ): DanishNumber {
    if (numGroup <= 99) {
      if (iterationCount > 100 && numGroup === 1) {
        const newNum: DanishNumber = {
          number: 1,
          name: danishNumberDict[iterationCount].gender ?? 'en',
        };
        return newNum;
      }
      return { ...danishNumberDict[numGroup] };
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
        name: hundredsName + ' ' + danishNumberDict[100].name,
        number: numGroup,
      };
      if (tens > 0) {
        resultNumber.name += ' ' + danishNumberDict[tens].name;
      }
      return resultNumber;
    }
  }

  /**
   * random int function from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   * @param min min number you want to get inclusive
   * @param max max number you want to get, exclusive
   * @returns integer between 0 inclusive and max exclusive
   */
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
