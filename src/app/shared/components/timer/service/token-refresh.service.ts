import { Injectable } from '@angular/core';
import { StorageDataService } from '../../../../core/services/storage-data.service';
import { LOGIN_RESPONSE, TOKEN } from '../../../../features/auth/models/login.type';
import { Observable } from 'rxjs';
import { TimerService } from './timer.service';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { ApiService } from '../../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService {

  constructor(
    private storageDataService: StorageDataService,
    private api: ApiService,
    private timerService: TimerService,
    private authService: AuthService
  ) { }

  refreshAccessToken(): Observable<TOKEN> {
    console.log('refreshToken', this.authService.currentUserSig());

    return this.api.post<TOKEN>(
      'auth/refresh',
      {
        refreshToken: this.authService.currentUserSig()?.refreshToken,
        expiresInMins: 2
      }
    );
  }

  handleTokenRefresh(): void {
    this.refreshAccessToken().subscribe({
      next: (res: TOKEN) => {
        localStorage.setItem('token', res.accessToken); // you can move this logic inside AuthService for better structure
        this.authService.currentUserSig.update(x => ({
          ...x,
          refreshToken: res.refreshToken
        } as LOGIN_RESPONSE));
        this.timerService.setTargetUnixTime(this.storageDataService.getAccessTokenTime() as number);
      },
      error: (error) => {
        console.log('TokenRefreshService error:', error);
      }
    });
  }
}

