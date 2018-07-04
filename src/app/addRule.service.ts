import { Injectable } from '@angular/core';

// for the http request
import { HttpClient } from '@angular/common/http';
import { Rule } from './components/index/rule';

@Injectable({
  providedIn: 'root'
})
export class AddRuleService {

  uri = 'http://localhost:4000/addRule';

  constructor(private http: HttpClient) { }

  addRuleFunc(cat,des) {
    const obj = {
      category: cat,
      description: des
    };
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getRule() {
    return this.http.get(`${this.uri}/`) // the final "/addRule" is still unclear
  }
}
