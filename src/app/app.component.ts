import { Component, OnInit } from '@angular/core';
import { RuleService } from './rule.service';
import { NgForm } from '@angular/forms';


// for the angular routing progress indicator
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {  NavigationCancel,
          Event,
          NavigationEnd,
          NavigationError,
          NavigationStart,
          Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Unwritten Rules';
  search: string;

  // in order to display the angular routing progress indicator
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private searchService: RuleService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  ngOnInit() {
    this.searchService.SearchQ.subscribe(search => this.search = search)
  }

  newMessage(searchForm: NgForm) {
    console.log(JSON.stringify( searchForm.value));
    this.searchService.changeMessage(searchForm.value.searchQ);
  }
}
