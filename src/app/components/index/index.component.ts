import { Component, OnInit } from '@angular/core';
import {Rule} from './rule';
import { AddRuleService } from '../../addRule.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  rules: Rule[];

  constructor(private addruleserviceVar: AddRuleService) {

  }

  ngOnInit() {
    // load all the rules in the database
    this.addruleserviceVar.getRule()
      .subscribe((data: Rule[]) => {
        this.rules = data;
      })
  
  }

}
