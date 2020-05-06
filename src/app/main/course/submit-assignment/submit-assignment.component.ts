import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {SubmitAssignmentModal} from './submit-assignment.modal';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.css']
})
export class SubmitAssignmentComponent implements OnInit {
  public assignments: SubmitAssignmentModal[];
  myFiles: string[] = [];
  constructor(private store: Store<fromApp.AppState>,
              private httpService: HttpClient) { }

  ngOnInit() {
    this.store.select('fromCourse').subscribe(
      state => {
        this.assignments = state.submitAssigments;
      }
    );
  }
  getFileDetails(e) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }
  uploadFiles() {
    // tslint:disable-next-line:variable-name
    const _uploadFolderId = this.getUniqueId(2);
    // tslint:disable-next-line:variable-name
    const _userId = 2;
    const frmData = new FormData();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.myFiles.length; i++) {
      frmData.append('fileUpload', this.myFiles[i]);
    }
    // tslint:disable-next-line:max-line-length
    this.httpService.post('http://localhost:12345/api/upload/UploadFiles?uploadFolderId=' + _uploadFolderId + '&userId=' + _userId + '', frmData).subscribe(
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

}
