import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {SubmitAssignmentModal} from './submit-assignment.modal';
import {HttpClient} from '@angular/common/http';
import {SlideInFromLeft} from '../../../transitions';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {saveAs} from 'file-saver';
import {CoursesSelectedCourseService} from '../courses-selected-course.service';
import {baseUrl} from '../../change-password/password.service';
import {AppComponentEventEmitterService} from '../../event-emmiter.service';


@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class SubmitAssignmentComponent implements OnInit, OnDestroy {
  public assignments: SubmitAssignmentModal[] = [];
  myFiles: string[] = [];
  public filePath: string;
  private selectedCourseSub: Subscription;

  constructor(private store: Store<fromApp.AppState>,
              private httpService: HttpClient,
              private selectedCourseService: CoursesSelectedCourseService,
              private clickEvent: AppComponentEventEmitterService) {
  }

  ngOnInit() {
    // api call to get the list of the course assignments
    this.selectedCourseSub = this.selectedCourseService.getCourse().subscribe(
      course => {
        this.fetchData();
      }
    );

    this.store.select('fromCourse').subscribe(
      state => {
        state.submitAssigments = this.assignments;
      }
    );
  }

  private fetchData() {
    console.log(JSON.parse(localStorage.getItem('currentUser')).D_ID);
    console.log(JSON.parse(localStorage.getItem('currentUser')).MAJ_ID);
    console.log(JSON.parse(localStorage.getItem('currentUser')).C_CODE);
    this.httpService.get<any>(`${baseUrl}/api/CourseAssignments/CourseAssignmentsBySubCode?`,
      {
        params: {
          dep_id: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          maj_id: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          c_code: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          sub_code: JSON.parse(localStorage.getItem('selectedCourse')).courseCode,
          section: localStorage.getItem('section')
        }
      })
      .pipe().subscribe(
      s => {
        // tslint:disable-next-line:forin
        for (const index in s) {
          this.assignments[index] = new SubmitAssignmentModal();
          this.assignments[index].assignmentName = s[index].ASSIGNMENT_TITLE;
          this.assignments[index].assignmentMarks = s[index].MARK;
          this.assignments[index].dueDate = s[index].DUE_DATE;
          this.assignments[index].assignmentDownloadFilename = s[index].FILE_NAME;
          this.assignments[index].assignmentDownloadFilepath = s[index].FILE_PATH;
        }
      }
    );
  }

  getFileDetails(e) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles(assignment: SubmitAssignmentModal) {
    // tslint:disable-next-line:variable-name
    const _uploadFolderId = this.getUniqueId(2);
    // tslint:disable-next-line:variable-name
    const _userId = 1;
    const frmData = new FormData();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.myFiles.length; i++) {
      frmData.append('fileUpload', this.myFiles[i]);
    }
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    console.log(assignment.assignmentName)
    // console.log(JSON.parse(localStorage.getItem('currentUser')).MAJ_ID);
    // console.log(JSON.parse(localStorage.getItem('currentUser')).C_CODE);
    // tslint:disable-next-line:max-line-length
    this.httpService.post(baseUrl + '/api/upload/UploadFiles?uploadFolderId=' + _uploadFolderId +
      '&userId=' + _userId + '', frmData).subscribe(
      s => {
        // here we are passing the assignment to submitted assignment
        this.httpService.get<any>(baseUrl + '/api/UploadAssignment/UploadAssignmentbyFileId?',
          {
            params: {
              YEAR: JSON.parse(localStorage.getItem('currentUser')).YEAR,
              C_CODE: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
              D_ID: JSON.parse(localStorage.getItem('currentUser')).D_ID,
              MAJ_ID: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
              RN: JSON.parse(localStorage.getItem('currentUser')).RN,
              ASS_TITLE: assignment.assignmentName,
              FILE: s[0].FILE_ID
            }
          }).pipe().subscribe(
          m => {
            console.log('success');
            this.clickEvent.message.next(true);
          },
          error => {
            console.log('assignment Submit Errrrr');
          }
        );
      },
      error => {
        console.log('fileNot Uploaded Errrrrr');
      }
    );
  }

  getUniqueId(parts: number) {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }

  OnAssignmentClicked(assignment: SubmitAssignmentModal) {
    this.DownLoadFiles(assignment.assignmentDownloadFilepath, assignment.assignmentDownloadFilename);
  }

  // for the downloading of the assignments
  DownLoadFiles(filePath: string, fileName: string) {
    // file type extension
    const checkFileType = fileName.split('.').pop();
    let fileType;
    if (checkFileType === '.txt') {
      fileType = 'text/plain';
    }
    if (checkFileType === '.pdf') {
      fileType = 'application/pdf';
    }
    if (checkFileType === '.doc') {
      fileType = 'application/vnd.ms-word';
    }
    if (checkFileType === '.docx') {
      fileType = 'application/vnd.ms-word';
    }
    if (checkFileType === '.xls') {
      fileType = 'application/vnd.ms-excel';
    }
    if (checkFileType === '.png') {
      fileType = 'image/png';
    }
    if (checkFileType === '.jpg') {
      fileType = 'image/jpeg';
    }
    if (checkFileType === '.jpeg') {
      fileType = 'image/jpeg';
    }
    if (checkFileType === '.gif') {
      fileType = 'image/gif';
    }
    if (checkFileType === '.csv') {
      fileType = 'text/csv';
    }
    this.DownloadFile(filePath)
      .subscribe(
        success => {
          saveAs(success, fileName);
        },
        err => {
          alert('Server error while downloading file.');
        }
      );
  }

  DownloadFile(filePath: string): Observable<any> {
    return this.httpService.post(baseUrl + '/api/Download/DownloadFile?filePath=' + filePath, '',
      {
        responseType: 'blob',
        observe: 'response'
      })
      .pipe(
        map((res: any) => {
          return new Blob([res.body]);
        })
      );
  }

  ngOnDestroy(): void {
    this.selectedCourseSub.unsubscribe();
  }
}
