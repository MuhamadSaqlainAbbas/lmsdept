import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  baseUrl = 'http://localhost:12345';
  constructor(private http: HttpClient) {
  }


  changePwd(usr: string, oldpwd: string, newpwd: string) {
    const url = `${this.baseUrl}/api/ChangeSP/change?usr=${usr}&oldpwd=${oldpwd}&newpwd=${newpwd}`;
    return this.http.get(url);
  }
}
