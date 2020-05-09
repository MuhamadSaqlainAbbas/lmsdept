import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {SemesterPreviousCoursesModal} from './semester-previous-courses.modal';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PreviousCourseModal} from './previous-course.modal';
import {SlideInFromLeft} from '../../transitions';

@Component({
  selector: 'app-previous-courses',
  templateUrl: './previous-courses.component.html',
  styleUrls: ['./previous-courses.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class PreviousCoursesComponent implements OnInit {
  public semesterPreviousCourses: SemesterPreviousCoursesModal[];
  public previous: PreviousCourseModal;
  constructor(private store: Store<fromApp.AppState>,
              private router: Router) { }

  ngOnInit() {

    // tslint:disable-next-line:max-line-length
    //               private http: HttpClient
    // const abc = this.http.get('http://localhost:49884/api/Courses/GetStudentPre
    // viousCourses?year=2016&c_code=1&d_id=1&maj_id=1&rn=1&se_id=1&t_no=1')
    //   .subscribe(
    //     s => {
    //       console.log(s);
    //
    //     }
    //   );
    this.store.select('fromPreviousCourses').subscribe(
      state => {
        this.semesterPreviousCourses = state.previousSemesterCourses;
      }
    );
  }
  OnCourseClicked() {
    this.router.navigate(['/course']);
  }
}
