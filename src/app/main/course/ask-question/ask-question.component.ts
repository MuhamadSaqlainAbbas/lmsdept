import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import {AskQuestionModal} from './ask-question.modal';
import * as fromCourse from '../store/course.actions';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class AskQuestionComponent implements OnInit {
  public askQuestion: AskQuestionModal;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }
  OnSubmit(formAskQuestion: NgForm) {
    this.askQuestion = new AskQuestionModal(formAskQuestion.value.InputTo, formAskQuestion.value.InputSubject,
      formAskQuestion.value.InputMessage);
    this.store.dispatch(new fromCourse.GetAskQuestion(this.askQuestion));
  }
}
