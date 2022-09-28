import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { NumbersGeneratorService } from '../numbers-generator.service';
import { DanishNumber } from '../numbers.interface';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  points = 0;

  constructor(
    public dialog: MatDialog,
    public numberGenService: NumbersGeneratorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.numberGenService.lowestNumber =
      this.activatedRoute.snapshot.params['lowest'];
    this.numberGenService.highestNumber =
      this.activatedRoute.snapshot.params['highest'];
    this.numberGenService.buildGuesses();
  }

  onGuess(num: DanishNumber) {
    if (this.numberGenService.hasGuessed) {
      return;
    }
    this.numberGenService.hasGuessed = true;
    if (this.numberGenService.correctAnswer.number === num.number) {
      this.points++;
    } else {
      this.points = 0;
    }
    this.numberGenService.selectedDanishNumbers.forEach(
      (num) => (num.state = 'incorrect')
    );
    this.numberGenService.selectedDanishNumbers[
      this.numberGenService.correctAnswerIndex
    ].state = 'correct';
  }

  replay() {
    this.numberGenService.buildGuesses();
  }

  onHelp() {
    const dialogRef = this.dialog.open(HelpDialogComponent, {});
  }
}
