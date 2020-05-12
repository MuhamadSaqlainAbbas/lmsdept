import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MainComponent} from './main.component';
import {AlertComponent} from './alert/alert.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {HomeComponent} from './home/home.component';
import {PreviousCoursesComponent} from './previous-courses/previous-courses.component';
import {TeacherAssesmentComponent} from './teacher-assesment/teacher-assesment.component';
import {TimeTableComponent} from './time-table/time-table.component';
import {CompleteTranscriptComponent} from './examination/complete-transcript/complete-transcript.component';
import {SemesterTranscriptComponent} from './examination/semester-transcript/semester-transcript.component';
import {DateSheetComponent} from './examination/date-sheet/date-sheet.component';
import {FeeStructureComponent} from './student-services/fee-structure/fee-structure.component';
import {StudentInformationComponent} from './student-services/student-information/student-information.component';
import {MainRoutingModule} from './main-routing.module';
import {AutoCloseDirective} from './auto.close.directive';
import {AppComponentEventEmitterService} from './event-emmiter.service';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import {ChangePasswordComponent} from './change-password/change-password.component';


@NgModule({
  declarations: [
    MainComponent,
    AlertComponent,
    ComplaintsComponent,
    HomeComponent,
    PreviousCoursesComponent,
    TeacherAssesmentComponent,
    TimeTableComponent,
    FeeStructureComponent,
    StudentInformationComponent,
    CompleteTranscriptComponent,
    SemesterTranscriptComponent,
    DateSheetComponent,
    AutoCloseDirective,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ChartsModule,
    FormsModule
  ],
  providers: [AppComponentEventEmitterService]
})
export class MainModule { }
