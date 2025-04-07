import { Injectable } from '@angular/core';
import { StorageDataService } from '../../../core/services/storage-data.service';
import { LOGIN_RESPONSE } from '../models/login.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storageDataService: StorageDataService,
    private router: Router
  ) { }

  setUserSession(loginResponse: LOGIN_RESPONSE): void {
    if (loginResponse?.accessToken) {
      localStorage.setItem('userData', JSON.stringify(loginResponse));
    } else {
      this.logout();
    }
  }

  isAuthenticated(): boolean {
    return !!this.storageDataService.getAccessToken();
  }

  logout(): void {
    localStorage.removeItem('userData'); // Remove stored user data
    this.router.navigateByUrl('/login');
  }
}
