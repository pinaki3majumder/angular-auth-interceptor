import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageDataService } from './storage-data.service';
import { LOGIN_RESPONSE, TOKEN } from '../../features/auth/models/login.type';
import { Observable } from 'rxjs';
import { TimerService } from '../../shared/components/timer/service/timer.service';
import { AuthService } from '../../features/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReLoginService {

  constructor(
    private storageDataService: StorageDataService,
    private http: HttpClient,
    private timerService: TimerService,
    private authService: AuthService
  ) { }

  loginWithRefreshToken(): Observable<TOKEN> {
    return this.http.post<TOKEN>(
      'https://dummyjson.com/auth/refresh',
      JSON.stringify({
        refreshToken: this.authService.currentUserSig()?.refreshToken, // Optional, if not provided, the server will use the cookie
        expiresInMins: 2
      })
    );
  }

  reLogin(): void {
    this.loginWithRefreshToken().subscribe({
      next: (res: TOKEN) => {
        localStorage.setItem('token', res.accessToken);
        this.authService.currentUserSig.update(x => ({ ...x, refreshToken: res.refreshToken } as LOGIN_RESPONSE));
        this.timerService.setTargetUnixTime(this.storageDataService.getAccessTokenTime() as number);
      },
      error: (error) => {
        console.log('ReLoginService---', error);
      }
    });
  }
}
