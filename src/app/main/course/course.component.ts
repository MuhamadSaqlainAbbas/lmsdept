import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromApp from './../../store/app.reducers';
import {Store} from '@ngrx/store';
import {SlideInFromLeft} from '../../transitions';

declare var $: any;


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class CourseComponent implements OnInit, OnDestroy {
  mySubscription: any;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) {
    // tslint:disable-next-line:only-arrow-functions
    /*this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };*/

    /*this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });*/
  }

  ngOnInit() {
    $('ul.navbar-nav > li.nav-item').on('click', () => {
      $('.navbar-collapse').collapse('hide');
    });
  }

  OnAnnouncementClicked() {
    this.router.navigate(['annoucement'], {relativeTo: this.route});
  }

  OnCourseOutlineClicked() {
    this.router.navigate(['courseOutline'], {relativeTo: this.route});
  }

  OnCourseMaterialClicked() {
    this.router.navigate(['courseMaterial'], {relativeTo: this.route});
  }

  OnSubmitAssignmentClicked() {
    this.router.navigate(['submitAssignment'], {relativeTo: this.route});
  }

  OnGradeBookClicked() {
    this.router.navigate(['gradeBook'], {relativeTo: this.route});
  }

  OnLeaveStatusClicked() {
    this.router.navigate(['leaveStatus'], {relativeTo: this.route});
  }

  OnAskQuestionClicked() {
    this.router.navigate(['askQuestion'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    /*if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }*/
  }
}
