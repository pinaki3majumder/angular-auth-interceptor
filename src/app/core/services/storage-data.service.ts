import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageDataService {

  constructor() { }

  getAccessToken(): string | null {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }

  getAccessTokenTime(): number | undefined {
    if (!this.getAccessToken()) {
      return;
    }

    const token = this.getAccessToken() as string;
    const tokenData = token.split('.')[1];
    const remainingTime = JSON.parse(atob(tokenData)).exp;
    return remainingTime;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
