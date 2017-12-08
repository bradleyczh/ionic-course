import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

/*
  Generated class for the ProcessHttpmsgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProcessHttpmsgProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProcessHttpmsgProvider Provider');
  }

  // Commented out code below because i used the new HttpClient module
  // public extractData(res: Response) {
  //   let body = res.json();
  //   return body || { };
  // }

  public handleError(error: HttpErrorResponse) {
    let errMsg: string;

    if(error.error instanceof Error) {
      // Client-side or network error occurred.
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error.message}`;
    }
    else {
      // The backend returned an unsuccessful response code.
      errMsg = `Backend returned error code ${error.status}, body was: ${error.error}`;
    }
    console.log(errMsg)
    return Observable.throw(errMsg);
  }
}
