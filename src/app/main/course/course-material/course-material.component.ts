import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {CourseMaterialModal} from './course-material.modal';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { saveAs } from 'file-saver';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-course-material',
  templateUrl: './course-material.component.html',
  styleUrls: ['./course-material.component.css']
})
export class CourseMaterialComponent implements OnInit {
  public courseMaterial: CourseMaterialModal[] = [];
  private filePath: string;
  private fileName: string;
   constructor(private store: Store<fromApp.AppState>,
               private http: HttpClient) {
     this.fileName = 'login page.txt.txt';
     this.filePath =  `C:\\Users\\Saqlain abbas\\source\\repos\\LMS-API\\LMS-API\\Files\\assignments\\dcb5-c821\\login page.txt`;
   }

  ngOnInit() {
    this.http.get<any>('http://localhost:12345/api/CourseMaterials/CourseMaterialsBySubCode?',
      { params: { dep_id: JSON.parse(localStorage.getItem('currentUser')).D_ID,
                          maj_id: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
                          c_code: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
                          sub_code: JSON.parse(localStorage.getItem('selectedCourse')).courseCode }})
      .pipe().subscribe(
      s => {
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
  DownLoadFiles() {
    // file type extension
    const checkFileType =  this.fileName.split('.').pop();
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
    this.DownloadFile(this.filePath)
      .subscribe(
        success => {
          saveAs(success, this.fileName);
        },
        err => {
          alert('Server error while downloading file.');
        }
      );
  }
  DownloadFile(filePath: string): Observable<any> {
    return this.http.post('http://localhost:12345/api/Download/DownloadFile?filePath=' + filePath , '',
      { responseType: 'blob',
        observe: 'response'})
      .pipe(
        map((res: any) => {
          return new Blob([res.body]);
        })
      );
  }
}
