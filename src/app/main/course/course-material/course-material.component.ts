import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {CourseMaterialModal} from './course-material.modal';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {saveAs} from 'file-saver';
import {map} from 'rxjs/operators';
import {CoursesSelectedCourseService} from '../courses-selected-course.service';
import {SlideInFromLeft} from '../../../transitions';
import {baseUrl} from '../../change-password/password.service';

@Component({
  selector: 'app-course-material',
  templateUrl: './course-material.component.html',
  styleUrls: ['./course-material.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class CourseMaterialComponent implements OnInit, OnDestroy {


  public courseMaterial: CourseMaterialModal[] = [];
  private selectedCourseSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>,
              private http: HttpClient,
              private selectedCourseService: CoursesSelectedCourseService) {
  }

  ngOnInit() {
    // Added By Yousaf this would listen to course Change and Call API
    this.selectedCourseSubscription = this.selectedCourseService.getCourse().subscribe(
      course => {
        this.fetchCourseMaterial();
      }
    );
  }

  private fetchCourseMaterial() {
    // here we are getting the course materials for the course code
    this.http.get<any>(`${baseUrl}/api/CourseMaterials/CourseMaterialsBySubCode?`, {params: {
          dep_id: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          maj_id: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          c_code: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          sub_code: JSON.parse(localStorage.getItem('selectedCourse')).courseCode,
          section: localStorage.getItem('section')
        }})
      .pipe().subscribe(
      s => {
        // tslint:disable-next-line:forin
        for (const index in s) {
          this.courseMaterial[index] = new CourseMaterialModal(s[index].CM_TITLE, s[index].FILENAME, s[index].FILEPATH);
          console.log(this.courseMaterial);
        }
      }
    );
    this.store.select('fromCourse').subscribe(
      state => {
        state.courseMaterial = this.courseMaterial;
      }
    );
  }

  DownLoadFiles(filePath: string, fileName: string) {
    console.log(fileName + filePath);
    // filePath = 'D:\\home\\site\\wwwroot\\Files\\assignments\\9086-356a\\56420_jordan-cr.png';
    // fileName = '56420_jordan-cr.png';
    // Added By:Yousaf to get relative file path
    // const filePath = downloadFile.value;
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
    return this.http.post(baseUrl + '/api/Download/DownloadFile?filePath=' + filePath, '',
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

  OnCourseMaterialClicked(courseMaterial: CourseMaterialModal) {
    this.DownLoadFiles(courseMaterial.filePath, courseMaterial.fileName);
  }

  ngOnDestroy(): void {
    this.selectedCourseSubscription.unsubscribe();
  }
}
