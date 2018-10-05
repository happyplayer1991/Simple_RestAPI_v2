import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { PlaceAddComponent } from './place-add/place-add.component';
import { PlaceEditComponent } from './place-edit/place-edit.component';
import { PlaceComponent } from './place/place.component';

// *** Angular 6 Datatable *** //
import {DataTableModule} from "angular-6-datatable";

@NgModule({
  declarations: [
    AppComponent,
    PlaceAddComponent,
    PlaceEditComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DataTableModule // Angular 6 Datatable
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }