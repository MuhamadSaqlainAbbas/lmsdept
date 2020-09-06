import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {SemesterPreviousCoursesModal} from './semester-previous-courses.modal';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PreviousCourseModal} from './previous-course.modal';
import {SlideInFromLeft} from '../../transitions';
import {baseUrl} from '../change-password/password.service';
import * as _ from 'lodash';

export interface PrevCourseModel {
  T_NO: number;
  SUB_CODE: string;
  SUB_NM: string;
}

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
  public prevCourses: [PrevCourseModel[]];

  constructor(private store: Store<fromApp.AppState>,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {

    const std = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get(`${baseUrl}/api/StudentPreviousCourses/getStudentPreviousCourses`, {
      params: {
        year: std.YEAR,
        c_code: std.C_CODE,
        d_id: std.D_ID,
        maj_id: std.MAJ_ID,
        rn: std.RN
      }
    }).subscribe(
      data => {

        const thi = this;
        // @ts-ignore
        const groupBy = key => data.reduce((r, a, i) => {
          if (!i || r[r.length - 1][0][key] !== a[key]) {
            return r.concat([[a]]);
          }
          r[r.length - 1].push(a);
          return r;
        }, []);

        this.prevCourses = groupBy('T_NO') as [PrevCourseModel[]];
        // console.log(this.prevCourses);

      }
    );
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
    /*this.store.select('fromPreviousCourses').subscribe(
      state => {
        this.semesterPreviousCourses = state.previousSemesterCourses;
      }
    );*/
  }

  OnCourseClicked() {
    this.router.navigate(['/course']);
  }
}

