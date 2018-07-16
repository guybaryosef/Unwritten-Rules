import { Injectable } from '@angular/core';

// for the http request
import { HttpClient } from '@angular/common/http';
import { Rule } from './components/index/rule';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  uri = 'http://localhost:4000/db';

  constructor(private http: HttpClient) { }

  //function to add a rule to the database
  addRuleFunc(descrip, ta): boolean {
    const obj = {
      description: descrip,
      tags: ta
    };
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(
          suc => {
            console.log('Successfully added rule to the database!');
            return true;
          },
          err => {
            console.log('Unable to add rule to the database. Maybe try again later.');
            return false;
          }
        );
    return false;
  }

  // function to get a rule from the database
  getRule() {
    return this.http.get(`${this.uri}/`) // the final "/addRule" is still unclear
  }

  // Function to get a random rule from the database
  getRandRule() {
    return this.http.get(`${this.uri}/rand`)
  }
}
