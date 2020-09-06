import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';



export const baseUrl = 'https://lms-api-ravian.azurewebsites.net';
// export const baseUrl = 'http://localhost:12345/';
@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private http: HttpClient) {
  }


  changePwd(usr: string, oldpwd: string, newpwd: string) {
    const url = `${baseUrl}/api/ChangeSP/change?usr=${usr}&oldpwd=${oldpwd}&newpwd=${newpwd}`;
    return this.http.get(url);
  }
}
