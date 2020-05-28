import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import {GradeBookModal} from './grade-book.modal';
import {GradeTypeModal} from './grade-type.modal';
import {HttpClient} from '@angular/common/http';
import {SlideInFromLeft} from '../../../transitions';
import {baseUrl} from '../../change-password/password.service';

@Component({
  selector: 'app-grade-book',
  templateUrl: './grade-book.component.html',
  styleUrls: ['./grade-book.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class GradeBookComponent implements OnInit {
  public gradebook: GradeBookModal;
  public midTermMarks: GradeTypeModal;
  public finalTermMarks: GradeTypeModal;
  public finaltermObtMarks: string;
  public finaltermTotalMarks: string;
  public midtermTotalMarks: string;
  public midtermObtMarks: string;
  public assignments: GradeTypeModal[] = [];
  public quizes: GradeTypeModal[] = [];
  public presentations: GradeTypeModal[] = [];
  constructor(private store: Store<fromApp.AppState>,
              private http: HttpClient) { }

  ngOnInit() {
    // for the assignment marks submiitted by the student
    this.http.get<any>(`${baseUrl}/api/CourseAssignmentResult/CourseAssignmentResultByRollNo?`,
      {
        params: {
          year: JSON.parse(localStorage.getItem('currentUser')).YEAR,
          dep_id: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          maj_id: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          c_code: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          rn: JSON.parse(localStorage.getItem('currentUser')).RN,
          sub_code: JSON.parse(localStorage.getItem('selectedCourse')).courseCode,
        }
      })
      .pipe().subscribe(
      s => {
        // tslint:disable-next-line:forin
        for (const index in s) {
          this.assignments[index] = new GradeTypeModal(s[index].ASSIGNMENT_TITLE, s[index].ASS_OBT_MRKS, s[index].ASS_TOT_MRKS);
        }
        // console.log(this.assignments);
      }
    );
    // for the result of all the quizes in that specific courses
    this.http.get<any>('http://localhost:12345/api/CoursePresentationResults/CoursePresentationResultByRollNo?',
      {
        params: {
          year: JSON.parse(localStorage.getItem('currentUser')).YEAR,
          dep_id: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          maj_id: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          c_code: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          rn: JSON.parse(localStorage.getItem('currentUser')).RN,
          sub_code: JSON.parse(localStorage.getItem('selectedCourse')).courseCode,
        }
      })
      .pipe().subscribe(
      s => {
        // tslint:disable-next-line:forin
        for (const index in s) {
          this.presentations[index] = new GradeTypeModal(s[index].ASSIGNMENT_TITLE, s[index].ASS_OBT_MRKS, s[index].ASS_TOT_MRKS);
        }
      }
    );
    // here are for the presentation of the course
    this.http.get<any>('http://localhost:12345/api/CourseQuizResult/CourseQuizResultByRollNo?',
      {
        params: {
          year: JSON.parse(localStorage.getItem('currentUser')).YEAR,
          dep_id: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          maj_id: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          c_code: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          rn: JSON.parse(localStorage.getItem('currentUser')).RN,
          sub_code: JSON.parse(localStorage.getItem('selectedCourse')).courseCode,
        }
      })
      .pipe().subscribe(
      s => {
        // tslint:disable-next-line:forin
        for (const index in s) {
          this.quizes[index] = new GradeTypeModal(s[index].ASSIGNMENT_TITLE, s[index].ASS_OBT_MRKS, s[index].ASS_TOT_MRKS);
        }
        // console.log(this.quizes);
      }
    );
    // for the final term marks
    this.http.get<any>('http://localhost:12345/api/FinalTermMarks/FinalTermMarksBySubCode?',
      {
        params: {
          year: JSON.parse(localStorage.getItem('currentUser')).YEAR,
          dep_id: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          maj_id: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          c_code: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          rn: JSON.parse(localStorage.getItem('currentUser')).RN,
          sub_code: JSON.parse(localStorage.getItem('selectedCourse')).courseCode,
        }
      })
      .pipe().subscribe(
      s => {
        this.finaltermObtMarks = s[0].MRKS_SS_FINAL;
        this.finaltermTotalMarks = s[0].MAX_MRKS_FINAL;
        this.finalTermMarks = new GradeTypeModal('final Term', s[0].MRKS_SS_FINAL, s[0].MAX_MRKS_FINAL);
      }
    );
      // mid term marks
    this.http.get<any>('http://localhost:12345/api/MidTermMarks/MidTermMarksBySubCode?',
      {
        params: {
          year: JSON.parse(localStorage.getItem('currentUser')).YEAR,
          dep_id: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          maj_id: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          c_code: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          rn: JSON.parse(localStorage.getItem('currentUser')).RN,
          sub_code: JSON.parse(localStorage.getItem('selectedCourse')).courseCode,
        }
      })
      .pipe().subscribe(
      s => {
        this.midtermObtMarks = s[0].MRKS_SS_MID;
        this.midtermTotalMarks = s[0].MAX_MRKS_MID;
        this.midTermMarks = new GradeTypeModal('mid Term', s[0].MRKS_SS_MID, s[0].MAX_MRKS_MID);
      }
    );
    this.store.select('fromCourse').subscribe(
      state => {
        // this.gradebook = state.gradeBook;
      }
    );
  }

}
