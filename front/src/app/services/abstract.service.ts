import {inject, Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";


export abstract class AbstractService<T> {

  protected apiUrl = environment.apiUrl;
  protected readonly http = inject(HttpClient);


  protected handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }

  protected getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, this.getHeaders())
      .pipe(catchError(this.handleError));
  }

  protected post<T, R>(endpoint: string, body: R): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, body, this.getHeaders())
      .pipe(catchError(this.handleError));
  }
}
