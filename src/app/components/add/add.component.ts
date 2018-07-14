import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AddRuleService } from '../../addRule.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {repeatingValidator, tooManyValidator} from './validators/tag-validator.directive';


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
      repeatingValidator(this.tags),
      tooManyValidator(this.tags)
    ])
  });
  

  tagOptions: string[] = ['Tip', 'Etiquette', 'Dresscode', 'Polite', 'Acceptable Behavior'];
  filteredOptions: Observable<string[]>;

  constructor(private addruleserviceVar: AddRuleService) {    
  }

  // Add a tag to the list of tags
  addTag(newTag: string) {
    if (!this.ruleForm.get('tag').invalid) {
        this.tags.push(newTag);
        this.ruleForm.get('tag').setValue('');
    }
  }

  // The error message for the tag input
  tagErrorMsg() {
    return this.ruleForm.get('tag').hasError('tooMany') ? 'You have entered the maximum amount of tags!' :
    this.ruleForm.get('tag').hasError('repeating') ? 'You have already added this tag!' :
            '';
  }

  // Removes a tag from the list of tags
  removeTag(tag) {
    this.tags.splice(tag,1);
    this.ruleForm.get('tag').setValue('');
  }




  // Add the rule and its associated tags to the database
  addRule(category, description) {
    this.addruleserviceVar.addRuleFunc(category, description);
  }


  ngOnInit() : void {

    //initializes the tag's autocomplete funcitonality
    this.filteredOptions = this.ruleForm.get('tag').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
