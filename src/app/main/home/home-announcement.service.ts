import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeAnnouncementService {

  private readonly baseUrl: string;

  // Sample URL's

  // http://localhost:12345/api/SemesterAnnouncements/GetSemesterAnnouncementForHome?year=2016&dep_id=1&maj_id=1&c_code=1&term=1
  // http://localhost:12345/api/DepartmentAnnouncements/GetDepartmentAnnouncementForHome?dep_id=1&maj_id=1&c_code=1
  constructor(private http: HttpClient) {
    this.baseUrl = `http://localhost:12345`;
  }

  getSemesterAnnouncement(year: number, depId: number, majId: number, courseCode: number, term: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.baseUrl + `/api/SemesterAnnouncements/GetSemesterAnnouncementForHome?year=${year}&dep_id=${depId}&maj_id=${majId}&c_code=${courseCode}&term=${term}`);
  }

  getDepartmentAnnouncement(depId: number, majId: number, courseCode: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.baseUrl + `/api/DepartmentAnnouncements/GetDepartmentAnnouncementForHome?DEP_ID=${depId}&MAJ_ID=${majId}&C_CODE=${courseCode}`);
  }
}
