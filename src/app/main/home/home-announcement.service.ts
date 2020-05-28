import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../change-password/password.service';

@Injectable({
  providedIn: 'root'
})
export class HomeAnnouncementService {

  constructor(private http: HttpClient) {
  }

  getSemesterAnnouncement(year: number, depId: number, majId: number, courseCode: number, term: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(baseUrl + `/api/SemesterAnnouncements/GetSemesterAnnouncementForHome?year=${year}&dep_id=${depId}&maj_id=${majId}&c_code=${courseCode}&term=${term}`);
  }

  getDepartmentAnnouncement(depId: number, majId: number, courseCode: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(baseUrl + `/api/DepartmentAnnouncements/GetDepartmentAnnouncementForHome?DEP_ID=${depId}&MAJ_ID=${majId}&C_CODE=${courseCode}`);
  }
}
