import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { AddRuleService } from '../../addRule.service';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private addruleserviceVar: AddRuleService, fb: FormBuilder) {
    
  }

  addRule(category, description) {
    this.addruleserviceVar.addRuleFunc(category, description);
  }

  ngOnInit() {
  }

}
