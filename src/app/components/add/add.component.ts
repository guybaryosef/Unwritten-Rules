import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import { AddRuleService } from '../../addRule.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  tags: string[] = [];

  tagControl = new FormControl();
  tagOptions: string[] = ['Tip', 'Etiquette', 'Dresscode', 'Polite', 'Acceptable Behavior'];
  filteredOptions: Observable<string[]>;
  curTag : string = "";
  tagError: string = "";

  constructor(private addruleserviceVar: AddRuleService) {    
  }

  // Add a tag to the list of tags
  addTag(newTag: string) {
    if (this.tags.indexOf(newTag) < 0) { //validates that the tag doesn't already exsist.
      if (this.tags.length >= 3) {
        this.tagError = "You have filled the maximum amount of tags.";
        return;
      }
      this.tags.push(newTag);
      this.curTag = '';
      this.tagError = "";
    }
    else {
      this.tagError = "This tag has already been added.";
    }
  }

  // Removes a tag from the list of tags
  removeTag(tag) {
    this.tags.splice(tag,1);
  }

  ngOnInit() {
    //initializes the tag's form control
    this.filteredOptions = this.tagControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagOptions.filter(option => option.toLowerCase().includes(filterValue));
  }


  // Add the rule and its associated tags to the database
  addRule(category, description) {
    this.addruleserviceVar.addRuleFunc(category, description);
  }
}
