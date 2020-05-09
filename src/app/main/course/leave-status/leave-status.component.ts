import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {LeaveStatusModal} from './leave-status.modal';
import {AbsentteeModal} from './absenttee.modal';
import {CourseModal} from '../course.modal';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css']
})
export class LeaveStatusComponent implements OnInit {
  public absenttee: AbsentteeModal[] = [];
  public leaveStatus: LeaveStatusModal;
  public present: string;
  public absent: string;
  constructor(private store: Store<fromApp.AppState>,
              private http: HttpClient) { }

  ngOnInit() {
    // fetching the dates of the absenttees from the web
    this.http.get<any>('http://localhost:12345/api/CourseAbsenttee/CourseAbsentteeBySubCode?',
      { params: { YEAR: JSON.parse(localStorage.getItem('currentUser')).YEAR,
          D_ID: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          MAJ_ID: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          C_CODE: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          RN: JSON.parse(localStorage.getItem('currentUser')).RN,
          SUB_CODE: JSON.parse(localStorage.getItem('selectedCourse')).courseCode}})
      .pipe().subscribe(
      s => {
        for (const index in s) {
          this.absenttee[index] = new AbsentteeModal(s[index].DA_DATE);
        }
      }
    );

    this.http.get<any>('http://localhost:12345/api/CourseAttendance/CourseAttendanceBySubCode?',
      { params: { YEAR: JSON.parse(localStorage.getItem('currentUser')).YEAR,
          D_ID: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          MAJ_ID: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          C_CODE: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          RN: JSON.parse(localStorage.getItem('currentUser')).RN}})
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
    this.store.select('fromCourse').subscribe(
      state => {
        state.leaveStatus = this.leaveStatus;
      }
    );
  }
}
