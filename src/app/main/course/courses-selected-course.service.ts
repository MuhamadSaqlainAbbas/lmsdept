import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CourseModal} from './course.modal';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesSelectedCourseService {

  constructor(private http: HttpClient) {
  }

  private selectedCourse = new BehaviorSubject<CourseModal>(undefined);

  // Service message commands
  announceSelectedCourse(message: CourseModal) {
    console.log('announced with values', message);
    this.selectedCourse.next(message);
  }

  getCourse = () => {
    return this.selectedCourse.asObservable();
  }


  getCourseMaterial() {
    this.http.get<any>('http://localhost:12345/api/CourseMaterials/CourseMaterialsBySubCode?', {
      params: {
        // dep_id: JSON.parse(localStorage.getItem('currentUser')).D_ID,
        //   maj_id: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
        //   c_code: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
        //   sub_code: JSON.parse(localStorage.getItem('selectedCourse')).courseCode
        dep_id: '1',
        maj_id: '1',
        c_code: '1',
        sub_code: '1',
      }
    }).pipe().subscribe(s => {
      console.log('Success');
      /*for (const index in s) {
        this.courseMaterial[index] = new CourseMaterialModal(s[index].CM_TITLE, s[index].FILENAME, s[index].FILEPATH);
        console.log(this.courseMaterial);
      }*/
    }, error => {
      console.log(error.toString());
    });
  }
}
