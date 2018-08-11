import { Component, OnInit } from '@angular/core';
import {Rule} from './rule';
import { RuleService } from '../../rule.service';

// for the icons
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  randRule: Rule;

  constructor( private ruleserviceVar: RuleService, 
               iconRegistry: MatIconRegistry, 
               sanitizer: DomSanitizer ) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/thumbs-up.svg')
    );

    iconRegistry.addSvgIcon(
      'thumbs-down',
      sanitizer.bypassSecurityTrustResourceUrl('assets/thumbs-down.svg')
    );
  }

  updateRule(to: String) {
    if (to == 'up') 
      this.randRule.thumbsUp += 1;
    else 
      this.randRule.thumbsDown += 1;
    
    this.ruleserviceVar.updateRule(this.randRule)
      .subscribe(
        rule =>  {
          console.log('Successfully updated the rule in the database.');
        },
        error => {
          console.error('Unable to currently update rule in the database.');
        }
      );
  }


  ngOnInit() {

    // Loads 'random' rule - first one in database
    this.ruleserviceVar.getRandRule()
      .subscribe( (data: Rule) => {
        this.randRule = data;
      })
  
  }

}
