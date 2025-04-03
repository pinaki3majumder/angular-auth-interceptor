import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REGISTER_FORM_VALUES } from '../models/register.type';
import { USER } from '../models/user.type';
import { LOGIN_FORM_VALUES, LOGIN_RESPONSE } from '../models/login.type';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryService {

  constructor(private http: HttpClient) { }

  registerUser(data: REGISTER_FORM_VALUES): Observable<USER> {
    return this.http.post<USER>('https://dummyjson.com/users/add', JSON.stringify(data),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'  // 👈 This forces a preflight request
        })
      }
    );
  }

  login(data: LOGIN_FORM_VALUES): Observable<LOGIN_RESPONSE> {
    return this.http.post<LOGIN_RESPONSE>('https://dummyjson.com/auth/login', JSON.stringify(data),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'  // 👈 This forces a preflight request
        })
      }
    );
  }
}
