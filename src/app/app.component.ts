import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { danishNumbers } from './numbers';
import { DanishNumber } from './numbers.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  selectedDanishNumbers!: DanishNumber[];
  correctAnswer!: DanishNumber;
  correctAnswerIndex!: number;
  points = 0;

  hasGuessed = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log();
    this.populateSelectedNumbers();
  }

  populateSelectedNumbers() {
    const tempIndicies: number[] = [];
    const numberOfChoices = 4;
    this.hasGuessed = false;
    if (this.selectedDanishNumbers && this.selectedDanishNumbers.length) {
      this.selectedDanishNumbers.forEach((num) => (num.state = ''));
    }
    this.selectedDanishNumbers = [];
    while (this.selectedDanishNumbers.length < numberOfChoices) {
      const tempIndex = this.getRandomInt(danishNumbers.length);
      if (!tempIndicies.includes(tempIndex)) {
        tempIndicies.push(tempIndex);
        this.selectedDanishNumbers.push(danishNumbers[tempIndex]);
      }
    }

    this.correctAnswerIndex = this.getRandomInt(
      this.selectedDanishNumbers.length
    );

    this.correctAnswer = this.selectedDanishNumbers[this.correctAnswerIndex];
  }

  onGuess(num: DanishNumber) {
    this.hasGuessed = true;
    if (this.correctAnswer.number === num.number) {
      this.points++;
    } else {
      this.points = 0;
    }
    this.selectedDanishNumbers.forEach((num) => (num.state = 'incorrect'));
    this.selectedDanishNumbers[this.correctAnswerIndex].state = 'correct';
  }

  replay() {
    this.populateSelectedNumbers();
  }

  onHelp() {
    const dialogRef = this.dialog.open(HelpDialogComponent, {});
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
