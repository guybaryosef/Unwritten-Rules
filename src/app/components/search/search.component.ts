import { Component, OnInit } from '@angular/core';

import { Rule } from '../index/rule';
import { RuleService } from '../../rule.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  //search query from toolbar
  search: string;

  //loaded rules
  rules: Rule[];

  // loads in the rules from database
  constructor(private searchService: RuleService) { }

  ngOnInit() {
    this.searchService.SearchQ.subscribe(search => this.search = search)

    // need to query and load list of rules (maybe 5?)
  }

}
