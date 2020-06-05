import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {LeaveStatusModal} from './leave-status.modal';
import {AbsentteeModal} from './absenttee.modal';
import {HttpClient} from '@angular/common/http';
import {SlideInFromLeft} from '../../../transitions';
import {CoursesSelectedCourseService} from '../courses-selected-course.service';
import {Subscription} from 'rxjs';
import {baseUrl} from '../../change-password/password.service';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class LeaveStatusComponent implements OnInit, OnDestroy {
  public absenttee: AbsentteeModal[] = [];
  public leaveStatus: LeaveStatusModal;
  public present: string;
  public absent: string;
  private selectedCourseSub: Subscription;

  constructor(private store: Store<fromApp.AppState>,
              private http: HttpClient,
              private selectedCourseService: CoursesSelectedCourseService) {
  }

  ngOnInit() {
    // fetching the dates of the absenttees from the web

    this.selectedCourseSub = this.selectedCourseService.getCourse().subscribe(
      course => {
        this.fetchData();
      }
    );
    this.store.select('fromCourse').subscribe(
      state => {
        state.leaveStatus = this.leaveStatus;
      }
    );
  }

  private fetchData() {
    this.http.get<any>(`${baseUrl}/api/CourseAbsenttee/CourseAbsentteeBySubCode?`,
      {
        params: {
          YEAR: JSON.parse(localStorage.getItem('currentUser')).YEAR,
          D_ID: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          MAJ_ID: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          C_CODE: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          RN: JSON.parse(localStorage.getItem('currentUser')).RN,
          SUB_CODE: JSON.parse(localStorage.getItem('selectedCourse')).courseCode
        }
      })
      .pipe().subscribe(
      s => {
        // tslint:disable-next-line:forin
        for (const index in s) {
          this.absenttee[index] = new AbsentteeModal(s[index].DA_DATE);
        }
      }
    );

    this.http.get<any>(baseUrl + '/api/CourseAttendance/CourseAttendanceBySubCode?',
      {
        params: {
          YEAR: JSON.parse(localStorage.getItem('currentUser')).YEAR,
          D_ID: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          MAJ_ID: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          C_CODE: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          RN: JSON.parse(localStorage.getItem('currentUser')).RN
        }
      })
      .pipe().subscribe(
      s => {
        for (const index in s) {
          if ((JSON.parse(localStorage.getItem('selectedCourse')).courseCode) === s[index].SUB_CODE) {
            this.present = s[index].PRESENT;
            this.absent = s[index].ABSENT;
            this.leaveStatus = new LeaveStatusModal(s[index].PRESENT, s[index].ABSENT, this.absenttee);
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedCourseSub.unsubscribe();
  }
}
