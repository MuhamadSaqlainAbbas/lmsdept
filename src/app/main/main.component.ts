import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromApp from './../store/app.reducers';
import {Store} from '@ngrx/store';
import {AppComponentEventEmitterService} from './event-emmiter.service';
import {User} from '../auth/_models';
import {AuthenticationService} from '../auth/_services';
import {HttpClient} from '@angular/common/http';
import {FadeIn} from '../transitions';
import {ToastrService} from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    FadeIn()
  ]
})
export class MainComponent implements OnInit {
  public studentName: string;
  public rollNumber: string;
  public cgpa: string;
  // from the role based authentication
  loading = false;
  currentUser: User;
  userFromApi: User;


  IsUserLoggedIn = false;
  showResetForm = false;
  showChangePassword = false;
  showMessage: boolean;


  constructor(private router: Router,
              private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private clickEvent: AppComponentEventEmitterService,
              private authenticationService: AuthenticationService,
              private http: HttpClient,
              private toastr: ToastrService) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.showMessage = false;
  }


  OnTimeTableClicked() {
    this.router.navigate(['timeTable'], {relativeTo: this.route});
  }
  OnShowMenuListItem(id: string) {
    /*const menu = document.getElementById(id);
    const ul = menu.getElementsByTagName('ul')[0];
    if (ul.classList.contains('mm-show')) {
      ul.classList.remove('mm-show');
      menu.classList.remove('mm-active');
    } else {
      ul.classList.add('mm-show');
      menu.classList.add('mm-active');
    }*/
  }

  OnnavBarHamBtnClicked() {
    const HamButton = document.getElementById('navBarHamBtn');
    const mainDivContainingNav = document.getElementById('main-container');
    if (HamButton.classList.contains('is-active')) {
      HamButton.classList.remove('is-active');
      mainDivContainingNav.classList.remove('sidebar-mobile-open');
    } else {
      HamButton.classList.add('is-active');
      mainDivContainingNav.classList.add('sidebar-mobile-open');
    }
  }

  OnnavBarHamBtn_lgClicked() {
    const hamButtonLg = document.getElementById('navBarHamBtn-lg');
    const mainDivContainingNav = document.getElementById('main-container');
    if (hamButtonLg.classList.contains('is-active')) {
      hamButtonLg.classList.remove('is-active');
      mainDivContainingNav.classList.remove('closed-sidebar');
      this.clickEvent.announceClick(false);
    } else {
      hamButtonLg.classList.add('is-active');
      mainDivContainingNav.classList.add('closed-sidebar');
      this.clickEvent.announceClick(true);
    }
  }

  OnAppHeaderMobileMenu() {
    const mobileMenu = document.getElementById('app-header-mobile-menu');
    const buttonContent = document.getElementById('content_mobile');
    const buttonActivated = mobileMenu.classList.contains('active');
    if (buttonActivated) {
      mobileMenu.classList.remove('active');
      buttonContent.classList.remove('header-mobile-open');
    } else {
      mobileMenu.classList.add('active');
      buttonContent.classList.add('header-mobile-open');
    }
  }

  ngOnInit(): void {
    // from the role based authentiction
    this.loading = true;

    $('.menu-list ul').on('click', () => {
      if (window.innerWidth < 992) {
        $('#navBarHamBtn').removeClass('is-active');
        $('#main-container').removeClass('sidebar-mobile-open');
      }
    });
    $('ul.vertical-nav-menu > li:not(.menu-list):not(.app-sidebar__heading)').on('click', () => {
      if (window.innerWidth < 992) {
        $('#navBarHamBtn').removeClass('is-active');
        $('#main-container').removeClass('sidebar-mobile-open');
      }
    });


    this.clickEvent.message.subscribe(
      value => {
        this.showMessage = true;
      }
    );
  }

  onCloseResetForm() {
    this.showResetForm = false;
  }

  onShowResetForm() {
    this.showResetForm = true;
  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth']);
  }

  OnChangePasswordClicked() {
    this.showChangePassword = true;
  }

  onCloseChangePasswordForm() {
    this.showChangePassword = false;
  }

  onCloseMessage() {
    this.showMessage = false;
  }
}
