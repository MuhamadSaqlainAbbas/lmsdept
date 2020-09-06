import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ChartType, ChartOptions, ChartDataSets} from 'chart.js';
import {SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color} from 'ng2-charts';
import * as fromApp from '../../store/app.reducers';
import {CourseAttendanceModal} from './courseAttendance.modal';
import {Store} from '@ngrx/store';
import {ProgressReportModal} from './progress-report-modal';
import {AnnouncementModal} from './announcement.modal';
import {HomeAnnouncementService} from './home-announcement.service';
import {SlideInFromLeft} from '../../transitions';
import {baseUrl} from '../change-password/password.service';
import {CourseModal} from '../course/course.modal';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';


// tslint:disable-next-line:class-name
interface announcementResponse {
  ANN_TITLE: string;
  ANN_DESC: string;
  ANN_DATE: string;
}

function chartInitialization() {
  monkeyPatchChartJsTooltip();
  monkeyPatchChartJsLegend();
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('chart') pieChart: ElementRef;

  public semesterAttendance: CourseAttendanceModal[];
  private progressReport: ProgressReportModal;
  public announcements: Array<AnnouncementModal>;
  public semesterCourses = new Array<CourseModal>();

  constructor(private store: Store<fromApp.AppState>,
              private http: HttpClient,
              private toastr: ToastrService,
              private homeAnnouncementService: HomeAnnouncementService) {
    // chartInitialization();
    this.announcements = new Array<AnnouncementModal>();
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  presents = 50;
  absents = 50;
  pieChartLabels: Label[] = [['present'], 'absent'];
  pieChartData: number[] = [this.presents, this.absents];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];

  lineChartData: ChartDataSets[] = [
    {data: [3.0, 4.0, 2.5, 3.5, 2.9, 3.1, 3.3, 3.6], label: 'Performance'},
  ];
  lineChartLabels: Label[] = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5',
    'Semester 6', 'Semester 7', 'Semester 8'];
  lineChartOptions = {
    responsive: true,
    suggestedMin: 0.0,
    suggestedMax: 4.0
  };
  lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(103, 58, 183, .1)',
      borderColor: 'rgb(103, 58, 183)',
      pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
      // borderColor: 'rgba(94,79,208,1)',
      // backgroundColor: 'rgba(255,255,0,0.28)'
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  ngOnInit(): void {

    this.http.get<any>(`${baseUrl}/api/EnrollCourses/ListOfEnrollCourses?`,
      {
        params: {
          YEAR: JSON.parse(localStorage.getItem('currentUser')).YEAR,
          C_CODE: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          D_ID: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          MAJ_ID: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          RN: JSON.parse(localStorage.getItem('currentUser')).RN
        }
      }).subscribe(
      s => {
        console.log(s);
        // tslint:disable-next-line:forin
        for (const index in s) {
          console.log(s[index]);
          this.semesterCourses[index] = new CourseModal(s[index].SUB_NM, s[index].SUB_CODE);
        }

        const student = JSON.parse(localStorage.getItem('currentUser'));
        this.http.get(`${baseUrl}/api/StudentAttendance/getStudentAttendanceByCourseCode`, {
          params: {
            year: student.YEAR,
            c_code: student.C_CODE,
            d_id: student.D_ID,
            maj_id: student.MAJ_ID,
            rn: student.RN,
            sub_code: this.semesterCourses[0].courseCode
          }
        }).subscribe(
          res => {
            console.log(res[0]);
            if (res === undefined || res === null) {
              return;
            }
            this.pieChartData = [res[0].PRESENTS, res[0].ABSENTS];
          }
        );






      }
    );


    /*this.store.select('fromHome').subscribe(
      state => {
        this.semesterAttendance = state.semesterAttendance;
        // this.announcements = state.announcements;
        this.lineChartData = [{data: [...state.progressReport.progressData], label: 'Performance'}];
        this.pieChartData = [this.semesterAttendance[0].presents, this.semesterAttendance[0].absents];
      }
    );*/
    this.homeAnnouncementService.getSemesterAnnouncement(2019, 1, 52, 11, 1).subscribe(
      response => {
        try {
          // @ts-ignore
          for (const res: announcementResponse of response) {
            this.announcements.push(new AnnouncementModal(res.ANN_TITLE, res.ANN_DESC, res.ANN_DATE));
          }
        } catch (e) {
          console.log(e);
        }
      }
    );
    this.homeAnnouncementService.getDepartmentAnnouncement(1, 52, 11).subscribe(
      response => {
        try {
          // @ts-ignore
          for (const res: announcementResponse of response) {
            this.announcements.push(new AnnouncementModal(res.ANN_TITLE, res.ANN_DESC, res.ANN_DATE));
          }
        } catch (e) {
          console.log(e);
        }
        console.log(this.announcements);
      }
    );
  }

  OnChange(event: Event) {
    // this.toastr.info('Loading Attendance');
    console.log('change');

    const subCode: string = (event.target as HTMLDataElement).value;
    console.log(subCode);


    const student = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get(`${baseUrl}/api/StudentAttendance/getStudentAttendanceByCourseCode`, {
      params: {
        year: student.YEAR,
        c_code: student.C_CODE,
        d_id: student.D_ID,
        maj_id: student.MAJ_ID,
        rn: student.RN,
        sub_code: subCode
      }
    }).subscribe(
      res => {
        console.log(res[0]);
        if (res === undefined || res === null) {
          return;
        }
        this.pieChartData = [res[0].PRESENTS, res[0].ABSENTS];
        this.toastr.success('Attendance Updated');
      },
      error => {
        console.log(error);
        this.toastr.error(`Failed to load:${error}`);
      }
    );


    // this.presents = this.semesterAttendance[index].presents;
    // this.absents = this.semesterAttendance[index].absents;
    // console.log(this.pieChart);

    // console.log('presents', this.presents, 'Absents:', this.absents);
  }
}
