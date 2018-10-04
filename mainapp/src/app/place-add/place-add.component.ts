import { Component, OnInit } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css']
})
export class PlaceAddComponent {

  place = new Place();
  submitted = false;

  constructor(
    private placeService: PlaceService,
    private location: Location
  ) { }

  newPlace(): void {
    this.submitted = false;
    this.place = new Place();
  }

 addPlace() {
   this.submitted = true;
   this.save();
 }

  goBack(): void {
    this.location.back();
  }

  private save(): void {
    console.log(this.place);
    this.placeService.addPlace(this.place)
        .subscribe();
  }

}
