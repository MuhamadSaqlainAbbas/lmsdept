import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import { saveAs } from 'file-saver';
import {map} from 'rxjs/operators';
import {baseUrl} from '../main/change-password/password.service';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit {
  private filePath: string;
  private fileName: string;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.fileName = 'login page.txt.txt';
    this.filePath =  `C:\\Users\\Saqlain abbas\\source\\repos\\LMS-API\\LMS-API\\Files\\assignments\\dcb5-c821\\login page.txt`;
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
    return this.http.post(`${baseUrl}/api/Download/DownloadFile?filePath=` + filePath , '',
      { responseType: 'blob',
                observe: 'response'})
      .pipe(
          map((res: any) => {
             return new Blob([res.body]);
        })
      );
  }
}



// DownLoadFiles() {
//   const fileName = this.attachmentFileName;
//   // file type extension
//   const checkFileType =  fileName.split('.').pop();
//   let fileType;
//   if (checkFileType === '.txt') {
//     fileType = 'text/plain';
//   }
//   if (checkFileType === '.pdf') {
//     fileType = 'application/pdf';
//   }
//   if (checkFileType === '.doc') {
//     fileType = 'application/vnd.ms-word';
//   }
//   if (checkFileType === '.docx') {
//     fileType = 'application/vnd.ms-word';
//   }
//   if (checkFileType === '.xls') {
//     fileType = 'application/vnd.ms-excel';
//   }
//   if (checkFileType === '.png') {
//     fileType = 'image/png';
//   }
//   if (checkFileType === '.jpg') {
//     fileType = 'image/jpeg';
//   }
//   if (checkFileType === '.jpeg') {
//     fileType = 'image/jpeg';
//   }
//   if (checkFileType === '.gif') {
//     fileType = 'image/gif';
//   }
//   if (checkFileType === '.csv') {
//     fileType = 'text/csv';
//   }
//   this.DownloadFile(fileName, fileType)
//     .subscribe(
//       success => {
//         saveAs(success, fileName);
//       },
//       err => {
//         alert('Server error while downloading file.');
//       }
//     );
// }
// DownloadFile(filePath: string, fileType: string): Observable<any> {
//
//   filePath =      `C:\\Users\\Saqlain abbas\\source\\repos\\LMS-API\\LMS-API\\Files\\assignments\\6614-3428\\LMSPro.zip`;
// // `C:\\Users\\Saqlain abbas\\source\\repos\\LMS-API\\LMS-API\\Files\\assignments\\68fa-b38a\\Screenshot_2020-01-15-23-28-27-01.png`;
//
// return this.http.post('http://localhost:12345/api/Download/DownloadFile?filePath=' + filePath , '',
//   { responseType: 'blob',
//     observe: 'response'})
//   .pipe(
//     map((res: any) => {
//       return new Blob([res.body]);
//     })
//
//   );
// }



