import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageDataService } from './storage-data.service';
import { LOGIN_RESPONSE, TOKEN } from '../../features/auth/models/login.type';
import { Observable } from 'rxjs';
import { TimerService } from '../../shared/components/timer/service/timer.service';

@Injectable({
  providedIn: 'root'
})
export class ReLoginService {

  constructor(
    private storageDataService: StorageDataService,
    private http: HttpClient,
    private timerService: TimerService
  ) { }

  loginWithRefreshToken(): Observable<TOKEN> {
    return this.http.post<TOKEN>(
      'https://dummyjson.com/auth/refresh',
      JSON.stringify({
        refreshToken: this.storageDataService.getRefreshToken(), // Optional, if not provided, the server will use the cookie
        expiresInMins: 2
      }),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'  // 👈 This forces a preflight request
        })
      }
    );
  }

  reLogin(): void {
    this.loginWithRefreshToken().subscribe({
      next: (res: TOKEN) => {
        const userData = this.storageDataService.getLocalStorageData() as LOGIN_RESPONSE;

        userData.accessToken = res.accessToken;
        userData.refreshToken = res.refreshToken;

        this.storageDataService.updateToken(userData);
        this.timerService.setTargetUnixTime(this.storageDataService.getAccessTokenTime());
      },
      error: (error) => {
        console.log('ReLoginService---', error);
      }
    });
  }
}
