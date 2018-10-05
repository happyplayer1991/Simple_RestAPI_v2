import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { PlaceComponent } from './place/place.component';
import { PlaceAddComponent } from './place-add/place-add.component';
import { PlaceEditComponent } from './place-edit/place-edit.component';

const routes: Routes = [
  { 
    path: 'places', 
    component: PlaceComponent 
  },
  { 
    path: 'place/add', 
    component: PlaceAddComponent 
  },
  { 
    path: 'places/:location', 
    component: PlaceEditComponent 
  },
  { 
    path: '', 
    redirectTo: 'places', 
    pathMatch: 'full'
  }, 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  // declarations: []
})
export class AppRoutingModule { }
