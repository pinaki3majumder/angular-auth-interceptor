import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('userData'); // Remove stored user data
    this.router.navigateByUrl('/login'); // Navigate to login page
  }
}
