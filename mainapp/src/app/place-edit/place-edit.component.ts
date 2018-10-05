import { Component, OnInit } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit {
  place = new Place() ;
  submitted = false;
  message: string;

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const locationName = this.route.snapshot.paramMap.get('location');
    this.placeService.getPlace(locationName)
      .subscribe(place => {
        this.place = place;
      });
  }

  update(): void {
    this.submitted = true;
    this.placeService.updatePlace(this.place)
        .subscribe(result => this.message = "Place Updated Successfully!");
  }

  delete(): void {
    this.submitted = true;
    this.placeService.deletePlace(this.place.locationName)
        .subscribe(result => this.message = "Place Deleted Successfully!");
  }

  goBack(): void {
    this.location.back();
  }

}
