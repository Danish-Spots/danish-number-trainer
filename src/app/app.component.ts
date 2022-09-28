import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { danishNumbers } from './numbers';
import { NumbersGeneratorService } from './numbers-generator.service';
import { DanishNumber } from './numbers.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  numberRanges = [
    {
      lowest: 0,
      highest: 10,
    },
    {
      lowest: 10,
      highest: 100,
    },
    {
      lowest: 0,
      highest: 100,
    },
    {
      lowest: 100,
      highest: 1000,
    },
    {
      lowest: 1000,
      highest: 10000,
    },
    {
      lowest: 1000,
      highest: 100000,
    },
    {
      lowest: 1000,
      highest: 1000000,
    },
  ];
}
