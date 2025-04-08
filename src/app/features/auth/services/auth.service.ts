import { Injectable, signal } from '@angular/core';
import { StorageDataService } from '../../../core/services/storage-data.service';
import { LOGIN_RESPONSE } from '../models/login.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSig = signal<LOGIN_RESPONSE | null | undefined>(undefined);

  constructor(
    private storageDataService: StorageDataService,
    private router: Router
  ) { }

  setUserSession(loginResponse: LOGIN_RESPONSE): void {
    if (loginResponse?.accessToken) {
      this.storageDataService.setToken(loginResponse.accessToken);
    } else {
      this.logout();
    }
  }

  isAuthenticated(): boolean {
    return !!this.storageDataService.getAccessToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
