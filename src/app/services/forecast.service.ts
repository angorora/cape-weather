import { Injectable } from '@angular/core';
import { Observable, throwError, pipe, zip, range, timer } from 'rxjs';
import { catchError, tap, retryWhen, map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private readonly apikey:string;
  private readonly baseUrl:string;
  
  constructor(private http: HttpClient) { 
    this.apikey = "591ef5bd5f9e07c7547639a93f6feb33";
    this.baseUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/";
  }
  
  getForecast(coordinates: string): Observable<any>{
     return this.http.get<any>(`${this.baseUrl}${this.apikey}/${coordinates}`)
                     .pipe( 
                          this.backoff(4,100),
                          catchError(this.handleError)
                       );
  }

  private handleError(error: HttpErrorResponse){
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred:', error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${error.status}, ` +  `body was: ${error.error}`;
    }
    // return an observable with a user-facing error message
    return throwError(errorMessage);
  }
 backoff(maxTries, ms) {
    return pipe(
      retryWhen(attempts => zip(range(1, maxTries), attempts)
        .pipe(
          map(([i]) => i * i),
          mergeMap(i =>  timer(i * ms))
        )
      )
    );
   }

}
