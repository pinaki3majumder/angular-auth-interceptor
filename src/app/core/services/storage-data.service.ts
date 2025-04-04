import { Injectable } from '@angular/core';
import { LOGIN_RESPONSE } from '../../features/auth/models/login.type';

@Injectable({
  providedIn: 'root'
})
export class StorageDataService {

  constructor() { }

  getLocalStorageData(): LOGIN_RESPONSE | null {
    const storageData = localStorage.getItem('userData');
    const user = storageData ? JSON.parse(storageData) : null;
    return user;
  }

  getAccessToken() {
    return (this.getLocalStorageData() as LOGIN_RESPONSE).accessToken;
  }

  getAccessTokenTime() {
    const tokenSplit = this.getAccessToken().split('.')[1];
    console.log(JSON.parse(atob(tokenSplit)).exp);
    const remainingTime = JSON.parse(atob(tokenSplit)).exp;
    return remainingTime;
  }

  getRefreshToken() {
    return (this.getLocalStorageData() as LOGIN_RESPONSE).refreshToken;
  }

  updateToken(data: any){
    localStorage.setItem('userData', JSON.stringify(data));
  }
}
