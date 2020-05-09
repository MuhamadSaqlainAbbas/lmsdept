import {Component, OnInit} from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {TimeTableModal} from './time-table.modal';
import {TimeTableDay} from './time-table-day.modal';
import {TimeTableServices} from './time-table-services/time-table-services.service';
import {SlideInFromLeft} from '../../transitions';

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

  private day: string;
  finalData: TimeTableModal;
  weekDays: Array<Array<TimeTableData>>;

  public timetableData: TimeTableModal;

  constructor(private store: Store<fromApp.AppState>, private timetableService: TimeTableServices) {
    this.weekDays = new Array<Array<TimeTableData>>(5);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.weekDays.length; i++) {
      this.weekDays[i] = new Array<TimeTableDay>();
    }
    this.finalData = new TimeTableModal([
      new Array<TimeTableDay>(7),
      new Array<TimeTableDay>(7),
      new Array<TimeTableDay>(7),
      new Array<TimeTableDay>(7),
      new Array<TimeTableDay>(7)
    ]);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.finalData.timetable.length; i++) {
      for (let j = 0; j < this.finalData.timetable[i].length; j++) {
        this.finalData.timetable[i][j] = new TimeTableDay(false, '', '', '', '', '', '');
      }
    }
  }

  ngOnInit() {
    this.store.select('fromTimeTable').subscribe(
      state => {
        this.timetableData = state.timetable;
      }
    );

    this.timetableService.getStudentTimeTable(2016, 1, 1, 1, 1).subscribe(
      response => {
        console.log(response);
        // temp Response For testing sort
        const tempResponse: TimeTableData[] = [
          {
            SUB_NM: 'INTRODUCTION TO COMPUTING',
            START_TIME: '12:30:00',
            END_TIME: '2:00:00',
            FM_NAME: 'Muhammad Hafeez',
            R_NAME: 'ROOM 2',
            DAY: 'Monday'
          },
          {
            SUB_NM: 'INTRODUCTION TO COMPUTING',
            START_TIME: '09:30:00',
            END_TIME: '11:00:00',
            FM_NAME: 'Muhammad Hafeez',
            R_NAME: 'ROOM 2',
            DAY: 'Monday'
          },
          {
            SUB_NM: 'INTRODUCTION TO COMPUTING',
            START_TIME: '08:00:00',
            END_TIME: '09:30:00',
            FM_NAME: 'ALI RAZA',
            R_NAME: 'ROOM 1',
            DAY: 'Monday'
          },
          {
            SUB_NM: 'INTRODUCTION TO COMPUTING',
            START_TIME: '08:00:00',
            END_TIME: '09:30:00',
            FM_NAME: 'ALI RAZA',
            R_NAME: 'ROOM 1',
            DAY: 'Tuesday'
          },
          {
            SUB_NM: 'INTRODUCTION TO COMPUTING',
            START_TIME: '12:30:00',
            END_TIME: '02:00:00',
            FM_NAME: 'ALI RAZA',
            R_NAME: 'ROOM 1',
            DAY: 'Wednesday'
          }
        ];

        this.getTimeTableFromJsonData(response);
      }
    );
    // this.getTimeTableFromJsonData([
    //   {
    //     SUB_NM: 'INTRODUCTION TO COMPUTING',
    //     START_TIME: '12:30:00',
    //     END_TIME: '2:00:00',
    //     FM_NAME: 'Muhammad Hafeez',
    //     R_NAME: 'ROOM 2',
    //     DAY: 'Monday'
    //   },
    //   {
    //     SUB_NM: 'INTRODUCTION TO COMPUTING',
    //     START_TIME: '09:30:00',
    //     END_TIME: '11:00:00',
    //     FM_NAME: 'Muhammad Hafeez',
    //     R_NAME: 'ROOM 2',
    //     DAY: 'Monday'
    //   },
    //   {
    //     SUB_NM: 'INTRODUCTION TO COMPUTING',
    //     START_TIME: '08:00:00',
    //     END_TIME: '09:30:00',
    //     FM_NAME: 'ALI RAZA',
    //     R_NAME: 'ROOM 1',
    //     DAY: 'Monday'
    //   },
    //   {
    //     SUB_NM: 'INTRODUCTION TO COMPUTING',
    //     START_TIME: '08:00:00',
    //     END_TIME: '09:30:00',
    //     FM_NAME: 'ALI RAZA',
    //     R_NAME: 'ROOM 1',
    //     DAY: 'Tuesday'
    //   },
    //   {
    //     SUB_NM: 'INTRODUCTION TO COMPUTING',
    //     START_TIME: '12:30:00',
    //     END_TIME: '02:00:00',
    //     FM_NAME: 'ALI RAZA',
    //     R_NAME: 'ROOM 1',
    //     DAY: 'Wednesday'
    //   }
    // ]);
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
}
