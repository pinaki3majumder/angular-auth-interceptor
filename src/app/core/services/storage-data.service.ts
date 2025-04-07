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
    console.log(JSON.parse(atob(tokenData)).exp);
    const remainingTime = JSON.parse(atob(tokenData)).exp;
    return remainingTime;
  }

  updateToken(data: any): void {
    localStorage.setItem('userData', JSON.stringify(data));
  }
}
