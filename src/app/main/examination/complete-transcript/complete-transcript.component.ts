import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {CompleteTranscriptModal} from './complete-transcript.modal';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-complete-transcript',
  templateUrl: './complete-transcript.component.html',
  styleUrls: ['./complete-transcript.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class CompleteTranscriptComponent implements OnInit {
  public completeTranscript: CompleteTranscriptModal;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('fromExamination').subscribe(
      state => {
        this.completeTranscript = state.completeTranscript;
      }
    );
  }

}
