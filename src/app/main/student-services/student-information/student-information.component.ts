import { Component, OnInit } from '@angular/core';
import {StudentInformationModel} from './student-information.model';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class StudentInformationComponent implements OnInit {
  public studentInformation: StudentInformationModel;
  constructor(private store: Store<fromApp.AppState>) { }
  ngOnInit(): void {
    const obj = JSON.parse(localStorage.getItem('currentUser'));
    this.studentInformation = new StudentInformationModel();
    this.studentInformation.registrationNo = obj.REG_NO;
    this.studentInformation.studentName = obj.NM;
    this.studentInformation.fatherName = obj.F_NM;
    this.studentInformation.cnic = obj.NIC;
    this.studentInformation.phoneNumber = obj.MOB;
    this.studentInformation.cgpa = obj.CGPA;
    this.studentInformation.password = JSON.parse(localStorage.getItem('password'));
    this.studentInformation.year = obj.YEAR;
    this.studentInformation.classCode = obj.C_CODE;
    this.studentInformation.departmentId = obj.D_ID;
    this.studentInformation.majorId = obj.MAJ_ID;
    this.studentInformation.rn = obj.RN;
    this.studentInformation.rollNumber = obj.ROLNO;
    this.studentInformation.dateOfBirth = obj.DOB;
    this.studentInformation.address = obj.ADD1;
    this.studentInformation.fId = obj.F_NO;
    this.studentInformation.sessionId = obj.SE_ID;
    this.studentInformation.gender = obj.GENDER;
    this.studentInformation.religion = obj.RELIG;
    this.studentInformation.MorE = obj.MRM_EVE;
    this.studentInformation.degreeNumber = obj.DEG_NO;
    this.studentInformation.degreeRegYear = obj.DEG_REC_YEAR;
    this.studentInformation.email = obj.EMAIL;
    this.studentInformation.photo = obj.PHTO;
    console.log(this.studentInformation);
    this.store.select('fromStudentService').subscribe(
      state => {
        state.studentInformation = this.studentInformation;
      }
    );
  }
}
