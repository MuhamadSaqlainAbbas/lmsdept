import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {AppComponentEventEmitterService} from '../../event-emmiter.service';
import {AnnouncementModal} from '../../home/announcement.modal';
import {HttpClient} from '@angular/common/http';
import {SlideInFromLeft} from '../../../transitions';
import {CoursesSelectedCourseService} from '../courses-selected-course.service';
import {Subscription} from 'rxjs';
import {baseUrl} from '../../change-password/password.service';

declare var $: any;

@Component({
  selector: 'app-annoucement',
  templateUrl: './annoucement.component.html',
  styleUrls: ['./annoucement.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class AnnoucementComponent implements OnInit, OnDestroy {

  announcements: AnnouncementModal[];
  private selectedCourseSubs: Subscription;
  constructor(private clickEvent: AppComponentEventEmitterService,
              private store: Store<fromApp.AppState>,
              private http: HttpClient,
              private selectedCourse: CoursesSelectedCourseService) {
  }

  ngOnInit() {
    // to get the section of the selected course



    this.selectedCourseSubs = this.selectedCourse.getCourse().subscribe(
      course => {
        this.fetchData();
      }
    );
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

  private fetchData() {
    this.http.get<any>(`${baseUrl}/api/Section/GetSectionThroughSubCode?`,
      {
        params: {
          YEAR: JSON.parse(localStorage.getItem('currentUser')).YEAR,
          C_CODE: JSON.parse(localStorage.getItem('currentUser')).C_CODE,
          D_ID: JSON.parse(localStorage.getItem('currentUser')).D_ID,
          MAJ_ID: JSON.parse(localStorage.getItem('currentUser')).MAJ_ID,
          RN: JSON.parse(localStorage.getItem('currentUser')).RN,
          SUB_CODE: JSON.parse(localStorage.getItem('selectedCourse')).courseCode
        }
      })
      .pipe().subscribe(
      s => {
        localStorage.setItem('section', s[0].SECTION);
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedCourseSubs.unsubscribe();
  }
}
