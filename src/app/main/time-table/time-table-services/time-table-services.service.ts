import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeTableServices {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `http://localhost:12345`;
  }

  // Returns Observable for the return
  getStudentTimeTable(year: number, depId: number, majId: number, courseCode: number, rollNo: number) {
    return this.http.get(this.baseUrl +
      `/api/StudentTimeTable/GetStudentTimeTable?YEAR=${year}&D_ID=${depId}&MAJ_ID=${majId}&C_CODE=${courseCode}&RN=${rollNo}`);
  }
}
