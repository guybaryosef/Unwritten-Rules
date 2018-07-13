import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AddRuleService } from '../../addRule.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {customTagValidator} from './validators/tag-validator.directive';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  tags: string[] = [];

  ruleForm = new FormGroup({
    rule: new FormControl('', [
      Validators.required
    ]),
    tag : new FormControl('', [
      Validators.required,
      customTagValidator
    ])
  });
  

  tagOptions: string[] = ['Tip', 'Etiquette', 'Dresscode', 'Polite', 'Acceptable Behavior'];
  filteredOptions: Observable<string[]>;

  constructor(private addruleserviceVar: AddRuleService) {    
  }

  // Add a tag to the list of tags
  addTag(newTag: string) {
    if (this.tags.indexOf(newTag) < 0) { //validates that the tag doesn't already exsist.
      if (this.tags.length >= 3) {
        //error msg about too many tags
      }
      else
        this.tags.push(newTag);
    }
    //else
      //error msg about lready being added
  }

  // error message function for tags
  tagErrorMsg() {
    return this.ruleForm.get('tag').hasError('required') ? 'You must enter a tag' :
           this.ruleForm.get('tag').hasError('customTagValidator') ? 'Too many tags/already added' :
           '' ;
  }

  // Removes a tag from the list of tags
  removeTag(tag) {
    this.tags.splice(tag,1);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagOptions.filter(option => option.toLowerCase().includes(filterValue));
  }


  // Add the rule and its associated tags to the database
  addRule(category, description) {
    this.addruleserviceVar.addRuleFunc(category, description);
  }


  ngOnInit() : void {
    //initializes the tag's form control
    this.filteredOptions = this.ruleForm.get('tag').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


}
