import { Injectable } from '@angular/core';
import { StorageDataService } from '../../../../core/services/storage-data.service';
import { LOGIN_RESPONSE, TOKEN } from '../../../../features/auth/models/login.type';
import { Observable, throwError } from 'rxjs';
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
    const refreshToken = this.authService.currentUserSig()?.refreshToken;

    if (this.isTokenExpired(refreshToken)) {
      console.warn('Refresh token has expired!');
      return throwError(() => new Error('Refresh token expired'));
    }

    return this.api.post<TOKEN>(
      'auth/refresh',
      {
        refreshToken,
        expiresInMins: 1
      }
    );
  }

  handleTokenRefresh(): void {
    this.refreshAccessToken().subscribe({
      next: (res: TOKEN) => {
        this.storageDataService.setToken(res.accessToken);
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

  isTokenExpired(token: string | undefined | null): boolean {
    if (!token) return true;

    try {
      const [, payloadBase64] = token.split('.');
      const payload = JSON.parse(atob(payloadBase64));
      const exp = payload.exp;

      if (!exp) return true;

      const nowInSeconds = Math.floor(Date.now() / 1000);
      return exp < nowInSeconds;
    } catch (err) {
      console.error('Invalid token format', err);
      return true;
    }
  }
}

