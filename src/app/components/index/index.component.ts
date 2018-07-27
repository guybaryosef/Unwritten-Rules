import { Component, OnInit } from '@angular/core';
import {Rule} from './rule';
import { RuleService } from '../../rule.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  randRule: Rule;

  constructor(private ruleserviceVar: RuleService) {}

  ngOnInit() {

    // Loads 'random' rule - first one in database
    this.ruleserviceVar.getRandRule()
      .subscribe( (data: Rule) => {
        this.randRule = data;
      })
  
  }

}
