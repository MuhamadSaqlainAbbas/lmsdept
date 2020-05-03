import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ChartType, ChartOptions, ChartDataSets} from 'chart.js';
import {SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color} from 'ng2-charts';
import * as fromApp from '../../store/app.reducers';
import {CourseAttendanceModal} from './courseAttendance.modal';
import {Store} from '@ngrx/store';
import {ProgressReportModal} from './progress-report-modal';
import {AnnouncementModal} from './announcement.modal';

function chartInitialization() {
  monkeyPatchChartJsTooltip();
  monkeyPatchChartJsLegend();
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('chart') pieChart: ElementRef;

  public semesterAttendance: CourseAttendanceModal[];
  private progressReport: ProgressReportModal;
  public announcements: AnnouncementModal[];

  constructor(private store: Store<fromApp.AppState>) {
    // chartInitialization();
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

    this.store.select('fromHome').subscribe(
      state => {
        this.semesterAttendance = state.semesterAttendance;
        this.announcements = state.announcements;
        this.lineChartData = [{data: [...state.progressReport.progressData], label: 'Performance'}];
        this.pieChartData = [this.semesterAttendance[0].presents, this.semesterAttendance[0].absents];
      }
    );
  }

  OnChange(event: Event) {
    console.log('change');
    const index: number = +(event.target as HTMLDataElement).value;
    this.presents = this.semesterAttendance[index].presents;
    this.absents = this.semesterAttendance[index].absents;
    this.pieChartData = [this.presents, this.absents];
    console.log(this.pieChart);
    console.log('presents', this.presents, 'Absents:', this.absents);
  }
}
