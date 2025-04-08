import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { REGISTER_FORM_VALUES } from '../models/register.type';
import { USER } from '../models/user.type';
import { LOGIN_FORM_VALUES, LOGIN_RESPONSE } from '../models/login.type';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryService {

  constructor(private api: ApiService) { }

  registerUser(data: REGISTER_FORM_VALUES): Observable<USER> {
    return this.api.post<USER>('users/add', data);
  }

  login(data: LOGIN_FORM_VALUES): Observable<LOGIN_RESPONSE> {
    return this.api.post<LOGIN_RESPONSE>('auth/login', data);
  }
}
