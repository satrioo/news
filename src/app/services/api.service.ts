// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry,timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(apiUrl: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>('https://newsapi.org/v2/'+apiUrl, { params }).pipe(
      // retry(2),
      timeout(100000),
      catchError(this.handleError)
    );
  }
  post<T>(apiUrl: string, data: any): Observable<T> {
    return this.http.post<T>(apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  patch<T>(apiUrl: string, data: any): Observable<T> {
    return this.http.patch<T>(apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(apiUrl: string): Observable<T> {
    return this.http.delete<T>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
