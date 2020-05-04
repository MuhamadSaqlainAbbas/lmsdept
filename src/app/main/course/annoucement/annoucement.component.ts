import {Component, OnInit} from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {AppComponentEventEmitterService} from '../../event-emmiter.service';
import {AnnouncementModal} from '../../home/announcement.modal';

declare var $: any;

@Component({
  selector: 'app-annoucement',
  templateUrl: './annoucement.component.html',
  styleUrls: ['./annoucement.component.css']
})
export class AnnoucementComponent implements OnInit {

  announcements: AnnouncementModal[];
  constructor(private clickEvent: AppComponentEventEmitterService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.store.select('fromCourse').subscribe(
      state => {
        this.announcements = state.announcements;
      }
    );
    $(document).ready(() => {
      $('#toggler').on('click', () => {
        $('.sidebar').toggleClass('hide-sidebar');
        // console.log('toggler');
      });
    });

    this.clickEvent.buttonClicked.asObservable().subscribe(
      response => {
        console.log('clicked listened in announcement with value ', response);
        if (response) {
          $('.sidebar').removeClass('hide-sidebar');
          $('#toggler').css('display', 'none');
          $('#details').css({'margin-top': '5px', 'margin-left': '5px'});
        } else {
          $('.sidebar').addClass('hide-sidebar');
          $('#toggler').css('display', 'block');
          $('#details').css({'margin-top': '40px', 'margin-left': '0px'});
        }
      }
    );


    window.addEventListener('resize', () => {
      console.log('change');
      if (window.innerWidth < 992) {
        $('.sidebar').addClass('hide-sidebar');
        $('#toggler').css('display', 'block');
        $('#details').css({'margin-top': '40px', 'margin-left': '0px'});
      } else {
        $('.sidebar').removeClass('hide-sidebar');
        $('#toggler').css('display', 'none');
        $('#details').css({'margin-top': '5px', 'margin-left': '5px'});
      }
    });


  }
}
