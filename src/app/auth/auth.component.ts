import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthenticationService} from './_services';
import {FadeSlideInDown} from '../transitions';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    FadeSlideInDown()
  ]
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue != null) {
      this.toastr.info('Already Loggin In', '', {timeOut: 3000, closeButton: true});
      this.router.navigate(['/main']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data === null || data === undefined) {
            this.toastr.error('Invalid Credentials', '', {timeOut: 3000, closeButton: true});
            this.loading = false;
            return;
          }
          this.toastr.success('Logged In Successfully', '', {timeOut: 3000, closeButton: true});
          this.router.navigate(['/main']);
        },
        error => {
          console.log(error);
          this.toastr.error(error);
          this.loading = false;
        });
  }
}
