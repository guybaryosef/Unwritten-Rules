import { Injectable } from '@angular/core';

// for the http request
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Rule } from './components/index/rule';

// allows us to use observables
import { Observable, throwError} from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RuleService {

  uri = 'http://localhost:4000/db';

  constructor(private http: HttpClient) { }



  /*
   *function to add a rule to the database
   */
  addRuleFunc(descrip, ta) : Observable<Rule> {
    const obj = {
      description: descrip,
      tags: ta,
      thumbsUp: 0,
      thumbsDown: 0
    };
    return this.http.post<Rule>(`${this.uri}/add`, obj)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // function to get a rule from the database
  getRule() {
    return this.http.get(`${this.uri}/`) // the final "/addRule" is still unclear
  }

  /*
   * Function to get a random rule from the database
   */
  getRandRule() {
    return this.http.get(`${this.uri}/rand`)
  }

  /*
   * Function to update a rule in the database
   */
  updateRule(Rule) {
    return this.http.get(`${this.uri}/edit/${Rule.id}`, Rule)
  }






  // error handles for adding a rule to the db
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The back-end returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Back-end returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}


