import { Component, OnInit } from '@angular/core';

import { Rule } from '../index/rule';
import { RuleService } from '../../rule.service';

// for the icons
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

// for routing capabilities (used if search query is 'Search')
import {Router} from '@angular/router';

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
  constructor( private searchService: RuleService, private router : Router,
                iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/thumbs-up.svg')
    );

    iconRegistry.addSvgIcon(
      'thumbs-down',
      sanitizer.bypassSecurityTrustResourceUrl('assets/thumbs-down.svg')
    );
    }

  ngOnInit() {
    //keeps local var search updated to most recent searched value
    this.searchService.SearchQ.subscribe(
      search => {
        if (search == "Search") {
          console.log('Redirecting to index.');
          this.router.navigate(['']);
        }   
        this.search = search;
     
        // queries and loads list of rules from database based on searched value
        this.searchService.getRules(this.search)
          .subscribe( (data: Rule[]) => {
            this.rules = data;
            console.log('Received rules.');
          });
      }
    )
    

  }

}
