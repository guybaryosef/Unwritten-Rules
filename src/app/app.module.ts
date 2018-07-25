import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddComponent } from './components/add/add.component';
import { SearchComponent } from './components/search/search.component';
import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';

//UI with angular material
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule }  from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// angular progress bar indicator when loading new page
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

// used to send http requests, if we end up needing it...
import { RuleService } from './rule.service';
import { HttpClientModule } from '@angular/common/http';

// angular routing
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'search/:id',
    component: SearchComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    SearchComponent,
    IndexComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SlimLoadingBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  providers: [
    RuleService   // for the http requests to connect to mongodb (mlab)
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
