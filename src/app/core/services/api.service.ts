import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { httpErrorHandler } from '../utils/http-error-handler.util';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://dummyjson.com/';

  constructor(private http: HttpClient) { }

  // Generic GET method
  get<T>(route: string, params: any = {}): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${route}`)
      .pipe(
        map(response => response),
        catchError(httpErrorHandler)
      );
  }

  // Generic POST method
  post<T>(route: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}${route}`, JSON.stringify(body))
      .pipe(
        map(response => response),
        catchError(httpErrorHandler)
      );
  }

  // Generic PUT method
  put<T>(route: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}${route}`, body)
      .pipe(
        map(response => response),
        catchError(httpErrorHandler)
      );
  }

  // Generic DELETE method
  delete<T>(route: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${route}`)
      .pipe(
        map(response => response),
        catchError(httpErrorHandler)
      );
  }
}
