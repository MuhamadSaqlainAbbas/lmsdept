import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import {SemesterDateSheetModal} from './semester-date-sheet.modal';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-date-sheet',
  templateUrl: './date-sheet.component.html',
  styleUrls: ['./date-sheet.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class DateSheetComponent implements OnInit {
  public subjects: SemesterDateSheetModal;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('fromExamination').subscribe(
      state => {
        this.subjects = state.semesterDateSheet;
      }
    );
  }

}
