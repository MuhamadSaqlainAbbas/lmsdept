import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {ComplaintModel} from './complaint.model';
import * as fromComplaintActions from './store/complaints.component.actions';
import {SlideInFromLeft} from '../../transitions';

declare var $: any;

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class ComplaintsComponent implements OnInit {
  show = false;
  data: ComplaintModel;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    $('input[type="file"]').change(e => {
      const fileName = e.target.files[0].name;
      $('.custom-file-label').html(fileName);
    });


  }

  onSubmit(form: NgForm) {
    console.log('submitteed', form);
    this.show = !form.valid && form.touched;
    this.data = new ComplaintModel(
      form.value.InputRegistration,
      form.value.InputStudentName,
      form.value.InputContactNo,
      form.value.InputEmail,
      form.value.inputComplaint,
      form.value.inputComplaintDetails,
      form.value.inputComplaintDocument,
      form.value.inputRevealIdentity,
      form.value.inputAgreement
    );
    console.log(this.data);
    this.store.dispatch(new fromComplaintActions.StoreInformation(this.data));
    setTimeout(() => {
      console.log('timeout');
      this.store.select('fromComplaints').subscribe(
        state => {
          console.log(state.information);
        }
      );
    }, 3000);
  }

  onClose() {
    this.show = false;
  }
}
