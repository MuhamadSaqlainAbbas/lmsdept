import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import {baseUrl} from '../main/change-password/password.service';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  myFiles: string[] = [];
  constructor(private httpService: HttpClient) { }
  ngOnInit() {
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
      this.httpService.post(`${baseUrl}/api/upload/UploadFiles?uploadFolderId=` + _uploadFolderId + '&userId=' + _userId + '', frmData)
        .subscribe(
      s => {
        console.log(s);
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
}
