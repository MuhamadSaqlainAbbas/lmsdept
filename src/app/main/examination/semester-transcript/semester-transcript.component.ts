import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {SemesterTranscriptModal} from './semester-transcript.modal';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-semester-transcript',
  templateUrl: './semester-transcript.component.html',
  styleUrls: ['./semester-transcript.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class SemesterTranscriptComponent implements OnInit {
  public semesterTranscript: SemesterTranscriptModal;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('fromExamination').subscribe(
      state => {
        this.semesterTranscript = state.semesterTranscript;
      }
    );
  }

}
