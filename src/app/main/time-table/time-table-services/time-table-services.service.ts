import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../../change-password/password.service';

@Injectable({
  providedIn: 'root'
})
export class TimeTableServices {
  constructor(private http: HttpClient) {
  }

  // Returns Observable for the return
  getStudentTimeTable(year: number, depId: number, majId: number, courseCode: number, rollNo: number) {
    return this.http.get(baseUrl +
      `/api/StudentTimeTable/GetStudentTimeTable?YEAR=${year}&D_ID=${depId}&MAJ_ID=${majId}&C_CODE=${courseCode}&RN=${rollNo}`);
  }
}
