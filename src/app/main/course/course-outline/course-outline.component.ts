import { Component, OnInit } from '@angular/core';
import {CourseOutlineModal} from './course-outline.modal';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-course-outline',
  templateUrl: './course-outline.component.html',
  styleUrls: ['./course-outline.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class CourseOutlineComponent implements OnInit {
  public courseOutline: CourseOutlineModal;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('fromCourse').subscribe(
      state => {
        this.courseOutline = state.courseOutline;
      }
    );
  }

}
