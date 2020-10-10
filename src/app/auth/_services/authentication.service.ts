import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../_models';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {baseUrl} from '../../main/change-password/password.service';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.get<any>(`${baseUrl}/api/Authentication/StudentLogin?`,
      {params: {_username: username, _password: password}})
      .pipe(map(user => {
        console.log(user);
        if (user[0].ROLNO.length > 4) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user[0]));
          // localStorage.setItem('password', password);
          this.currentUserSubject.next(user[0]);
        }
        return user[0];
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
