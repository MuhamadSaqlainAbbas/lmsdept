import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {TimeTableModal} from './time-table.modal';
import {TimeTableDay} from './time-table-day.modal';
import {TimeTableServices} from './time-table-services/time-table-services.service';
import {SlideInFromLeft} from '../../transitions';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../change-password/password.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangeDetection} from '@angular/cli/lib/config/schema';

enum DaysOfWeeks {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday'
}

interface TimeTableData {
  SUB_NM: string;
  START_TIME: string;
  END_TIME: string;
  FM_NAME: string;
  R_NAME: string;
  DAY: string;
}

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class TimeTableComponent implements OnInit {

  selectedTerm = '0';

  constructor(private store: Store<fromApp.AppState>,
              private timetableService: TimeTableServices,
              private toastr: ToastrService, private http: HttpClient,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder) {

    this.getCourses(this.selectedTerm).subscribe(
      value => {
        if (value) {
          this.courses = value as [];
          console.log(value);
          console.log(this.courses);
        }
      }
    );

    this.getSections().subscribe(
      value => {
        console.log(value);
        this.sections = value as [];
      }
    );

    this.getRooms().subscribe(
      value => {
        console.log(value);
        this.rooms = value as [];
      }
    );

    this.getTeachers().subscribe(
      value => {
        console.log(value);
        this.teachers = value as [];
      }
    );
  }

  courses = [];
  rooms = [];
  sections = [];

  private day: string;
  finalData: TimeTableModal;
  weekDays: Array<Array<TimeTableData>>;

  public timetableData: TimeTableModal;
  teacherID = '';
  teachers = [];
  createForm: FormGroup;

  // tslint:disable-next-line:max-line-length

  private getCourses(selectedTerm: string) {
    return this.http.get(`${baseUrl}/api/GetDepartmentSubjectname/GetSubjects/?t_no=${selectedTerm}&c_code=${11}`);
  }

  private getSections() {
    return this.http.get(`${baseUrl}/api/GetSectionForDepartment/GetSections/?c_code=${11}`);
  }

  private getRooms() {
    return this.http.get(`${baseUrl}/api/GetDepartmentRooms/GetRoomsForDepartment`);
  }

  private getTeachers() {
    return this.http.get(`${baseUrl}/api/GetTeacherForDepartment/GetTeachers?c_code=${11}`);
  }

  // tslint:disable-next-line:max-line-length
  private createEntry(cCode: number, day: string, fmName: string, roomName: string, sec: string, subName: string, tNo: number, MrEv: string, startTime: string, endTime: string, logID: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${baseUrl}/api/InsertDepartmentTimetable/insertTimetable/?c_code=${cCode}&day=${day}&fm_nm=${fmName}&r_nm=${roomName}&section=${sec}&sub_nm=${subName}&t_no=${tNo}&me=${MrEv}&start_time=${startTime}&end_time=${endTime}&log_id=${logID}`);
  }


  ngOnInit() {
    this.createForm = this.fb.group({
      teacher: ['', Validators.required],
      section: ['', Validators.required],
      course: ['', Validators.required],
      room: ['', Validators.required],
      st_time: ['', Validators.required],
      day: ['', Validators.required],
      term: ['0', Validators.required],
      mrev: ['', Validators.required],
    });
  }


  getTimeTableFromJsonData(data) {
    for (const entry of data) {
      this.day = entry.DAY;
      console.log(this.day.toLowerCase() === DaysOfWeeks.monday);
      if (this.day.toLowerCase() === DaysOfWeeks.monday) {
        this.weekDays[0].push(entry);
      } else if (this.day.toLowerCase() === DaysOfWeeks.tuesday) {
        this.weekDays[1].push(entry);
      } else if (this.day.toLowerCase() === DaysOfWeeks.wednesday) {
        this.weekDays[2].push(entry);
      } else if (this.day.toLowerCase() === DaysOfWeeks.thursday) {
        this.weekDays[3].push(entry);
      } else if (this.day.toLowerCase() === DaysOfWeeks.friday) {
        this.weekDays[4].push(entry);
      }
    }

    // For Sorting the Each week array
    function compare(a: TimeTableData, b: TimeTableData) {
      const dateA = Date.parse('1970-01-01T' + a.START_TIME + 'Z');
      const dateB = Date.parse('1970-01-01T' + b.START_TIME + 'Z');
      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return 0;
      }

    }

    for (let i = 0; i < this.weekDays[0].length; i++) {
      this.weekDays[i].sort(compare);
    }

    // This is for placing the Lectures in thier respective place in the 5x7 2D array
    for (let i = 0; i < this.weekDays.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.weekDays[i].length; j++) {
        if (this.weekDays[i][j].START_TIME === '08:00:00') {
          // tslint:disable-next-line:max-line-length
          this.finalData.timetable[i][0] = new TimeTableDay(true, this.weekDays[i][j].SUB_NM, this.weekDays[i][j].START_TIME, this.weekDays[i][j].END_TIME, this.weekDays[i][j].FM_NAME, this.weekDays[i][j].R_NAME, this.weekDays[i][j].DAY);
          console.log(this.finalData.timetable[i][0]);
        } else if (this.weekDays[i][j].START_TIME === '09:30:00') {
          // tslint:disable-next-line:max-line-length
          this.finalData.timetable[i][1] = new TimeTableDay(true, this.weekDays[i][j].SUB_NM, this.weekDays[i][j].START_TIME, this.weekDays[i][j].END_TIME, this.weekDays[i][j].FM_NAME, this.weekDays[i][j].R_NAME, this.weekDays[i][j].DAY);
        } else if (this.weekDays[i][j].START_TIME === '11:00:00') {
          // tslint:disable-next-line:max-line-length
          this.finalData.timetable[i][2] = new TimeTableDay(true, this.weekDays[i][j].SUB_NM, this.weekDays[i][j].START_TIME, this.weekDays[i][j].END_TIME, this.weekDays[i][j].FM_NAME, this.weekDays[i][j].R_NAME, this.weekDays[i][j].DAY);
        } else if (this.weekDays[i][j].START_TIME === '12:30:00') {
          // tslint:disable-next-line:max-line-length
          this.finalData.timetable[i][3] = new TimeTableDay(true, this.weekDays[i][j].SUB_NM, this.weekDays[i][j].START_TIME, this.weekDays[i][j].END_TIME, this.weekDays[i][j].FM_NAME, this.weekDays[i][j].R_NAME, this.weekDays[i][j].DAY);
        } else if (this.weekDays[i][j].START_TIME === '04:00:00') {
          // tslint:disable-next-line:max-line-length
          this.finalData.timetable[i][4] = new TimeTableDay(true, this.weekDays[i][j].SUB_NM, this.weekDays[i][j].START_TIME, this.weekDays[i][j].END_TIME, this.weekDays[i][j].FM_NAME, this.weekDays[i][j].R_NAME, this.weekDays[i][j].DAY);
        } else if (this.weekDays[i][j].START_TIME === '05:30:00') {
          // tslint:disable-next-line:max-line-length
          this.finalData.timetable[i][5] = new TimeTableDay(true, this.weekDays[i][j].SUB_NM, this.weekDays[i][j].START_TIME, this.weekDays[i][j].END_TIME, this.weekDays[i][j].FM_NAME, this.weekDays[i][j].R_NAME, this.weekDays[i][j].DAY);
        } else if (this.weekDays[i][j].START_TIME === '07:00:00') {
          // tslint:disable-next-line:max-line-length
          this.finalData.timetable[i][6] = new TimeTableDay(true, this.weekDays[i][j].SUB_NM, this.weekDays[i][j].START_TIME, this.weekDays[i][j].END_TIME, this.weekDays[i][j].FM_NAME, this.weekDays[i][j].R_NAME, this.weekDays[i][j].DAY);
        }
      }
    }


    // Just for debugging
    // @ts-ignore
    for (const day of this.finalData.timetable[0]) {
      console.log(day.START_TIME);
    }
  }

  onCreateClass() {
    if (this.createForm.invalid) {
      this.toastr.error('Fields are empty');
      return;
    }

    console.log(this.createForm.value);
    const teacher = this.createForm.controls.teacher.value;
    const section = this.createForm.controls.section.value;
    const course = this.createForm.controls.course.value;
    const room = this.createForm.controls.room.value;
    const stTime = this.createForm.controls.st_time.value;
    const day = this.createForm.controls.day.value;
    const term = this.createForm.controls.term.value;
    const mrev = this.createForm.controls.mrev.value;


    this.toastr.info('Creating');

    this.createEntry(11, day, teacher, room, section, course, +this.selectedTerm, mrev, stTime, '00:00:00', 1).subscribe(
      value => {
        this.toastr.success('Created');
      },
      error => {
        this.toastr.error('Error');
      }
    );
  }

  onTermChange() {
    console.log(this.selectedTerm);
    this.getCourses(this.selectedTerm).subscribe(
      value => {
        console.log(value);
        this.courses = value as [];
        this.cdr.detectChanges();
      }
    );
  }
}
