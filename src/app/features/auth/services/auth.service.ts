import { Injectable } from '@angular/core';
import { StorageDataService } from '../../../core/services/storage-data.service';
import { LOGIN_RESPONSE } from '../models/login.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor(
    private storageDataService: StorageDataService,
    private router: Router
  ) {
    this.isAuthenticated = this.storageDataService.getAccessToken() ? true : false;
  }

  isLoggedIn(res: LOGIN_RESPONSE): boolean {
    if (res) {
      localStorage.setItem('userData', JSON.stringify(res));
      return this.isAuthenticated = true;
    } else {
      return this.isAuthenticated = false;
    }
  }

  isAuthenticatedUser(): boolean {    
    return this.isAuthenticated = this.storageDataService.getAccessToken() ? true : false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('userData'); // Remove stored user data
    this.router.navigateByUrl('/login');
  }
}
