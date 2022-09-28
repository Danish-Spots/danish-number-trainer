import { Injectable } from '@angular/core';
import { Answer } from './answer.interface';
import { danishNumbers } from './numbers';
import { DanishNumber } from './numbers.interface';

@Injectable({
  providedIn: 'root',
})
export class NumbersGeneratorService {
  private numbersOneToNine = danishNumbers.slice(1, 9);
  constructor() {}

  /**
   * Creates an array of guesses based on a number of digits value provided.
   * It is possible for there to be a value greater than the numberOfDigits passed,
   * and that is because of the range aspect. For example, if you pass 2, then you will get
   * guesses in the range of 10 to 100 inclusive on both ends.
   * @param numberOfDigits numberOfDigits the return number guesses should be
   */
  getFourNumbers(numberOfDigits: number) {
    let selectedNumbers: DanishNumber[] = [];
    switch (numberOfDigits) {
      case 1:
        // range 0 - 10
        selectedNumbers = danishNumbers.slice(0, 10);
        break;
      case 2:
        // range 10 - 100
        selectedNumbers = danishNumbers.slice(10, 100);
        break;
      case 3:
        // range 100 - 1000
        break;
      case 4:
        // 1000 - 10 000
        break;
      case 5:
        // 10 000 - 100 000
        break;
      case 6:
        // 100 000 - 1 000 000
        break;
      case 7:
        // 1 000 000 - 10 000 000
        break;
      case -2:
        // 0 - 100
        break;
      case -3:
        // 0 - 1000
        break;
      case -4:
        // phone numbers
        // currently no plans to implement this.
        break;
      default:
        break;
    }
    console.log(selectedNumbers);
  }

  generateNumberString(digitSize: number, num: number) {
    const numString = num.toString();
    let danishNumString = '';
    // last two digit places will be taken care of using the danishNumbers array
    for (let i = 0; i < digitSize - 1; i++) {
      const digit = numString[i];
      danishNumString += this.numbersOneToNine.find(
        (d) => d.number === +digit
      )?.name;
    }
  }

  getPlacementName(index: number, digitSize: number) {
    switch (digitSize) {
      case 3:
        break;

      default:
        break;
    }
  }

  getCorrectAnswer(selectedNumbers: DanishNumber[]): Answer {
    const correctAnswerIndex = this.getRandomInt(selectedNumbers.length);

    const correctAnswer = selectedNumbers[correctAnswerIndex];
    return {
      answer: correctAnswer,
      answerIndex: correctAnswerIndex,
    };
  }

  chooseFromArray(numberArray: DanishNumber[], numberOfChoices: number = 4) {
    const tempIndicies: number[] = [];
    const numbers: DanishNumber[] = [];

    while (numbers.length < numberOfChoices) {
      const tempIndex = this.getRandomInt(danishNumbers.length);
      if (!tempIndicies.includes(tempIndex)) {
        tempIndicies.push(tempIndex);
        numbers.push(danishNumbers[tempIndex]);
      }
    }

    return numbers;
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
