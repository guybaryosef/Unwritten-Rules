import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { RuleService } from '../../rule.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {repeatingValidator, tooManyValidator} from './validators/tag-validator.directive';
import { BaseTreeControl } from '@angular/cdk/tree';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  tags: string[] = [];
  tagOptions: string[] = ['Tip', 'Etiquette', 'Dresscode', 'Polite', 'Acceptable Behavior'];
  filteredOptions: Observable<string[]>;
  errorSub: boolean;
  showSpinner: boolean;
  addedRule: boolean;

  ruleForm = new FormGroup({
    rule: new FormControl('', [
      Validators.required
    ]),
    tag : new FormControl('', [
      repeatingValidator(this.tags),
      tooManyValidator(this.tags)
    ])
  });
  
  constructor(private ruleserviceVar: RuleService) {   
    this.errorSub = false; 
    this.showSpinner = false;
    this.addedRule = false;
  }


  // Add a tag to the list of tags
  addTag(newTag: string) {      
    if (!this.ruleForm.get('tag').invalid && newTag != '') {
        this.tags.push(newTag);
        this.ruleForm.get('tag').setValue('');
    }
  }


  // The error message for the tag input
  tagErrorMsg() {
    if ( this.ruleForm.get('tag').hasError('tooMany') )
      return 'You have entered the maximum amount of tags!';
    else if ( this.ruleForm.get('tag').hasError('repeating') )
      return 'You have already added this tag!';
    else
      return '';
  }


  // Removes a tag from the list of tags
  removeTag(tag) {
    this.tags.splice(tag,1);
    this.ruleForm.get('tag').setValue('');
  }


  // Add the rule and its associated tags to the database
  addRule(des) {
    this.errorSub = false;
    this.showSpinner = true;

    this.ruleserviceVar.addRuleFunc(des, this.tags)
      .subscribe( 
        rule =>  {
          console.log('Succesfully added rule to database. Rule: ' + rule);
          this.addedRule = true;
          this.showSpinner = false;
        },
        error => {
          console.error('Observer got an error: ' + error);
          this.errorSub = true; // gives error that unable to submit rule to db
          this.showSpinner = false;
        }
      );
  }


  ngOnInit() : void {

    //initializes the tag's autocomplete funcitonality
    this.filteredOptions = this.ruleForm.get('tag').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  // function used for the autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
