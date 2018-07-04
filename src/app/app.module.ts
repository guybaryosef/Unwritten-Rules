import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddComponent } from './components/add/add.component';
import { SearchComponent } from './components/search/search.component';
import { IndexComponent } from './components/index/index.component';

//UI with angular material
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule }  from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// angular progress bar indicator
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

// used to send http requests, if we end up needing it...
import { AddRuleService } from './addRule.service';
import { HttpClientModule } from '@angular/common/http';

// angular routing
import {RouterModule, Routes} from '@angular/router';
const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'add',
    component: AddComponent
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
    IndexComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    SlimLoadingBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule
    
  ],
  providers: [
    AddRuleService   // for the http requests to connect to mongodb (mlab)
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
