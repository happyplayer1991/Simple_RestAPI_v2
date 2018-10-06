import { Component, OnInit } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';

import {Router} from "@angular/router";
import { query } from '@angular/core/src/render3/query';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  places: Place[];

  public data = {}; // receive place data
  constructor(
    private placeService: PlaceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // *** recive data *** //
    this.placeService.myMethod$.subscribe((data) => {
      this.data = data; // And he have data here too!
      console.log('123');
      var place = this.data[0];
      var query_string = `locationName=${place.locationName}&description=${place.description}&latitude=${place.latitude}&longitude=${place.longitude}`;
      console.log(query_string);
      this.getPlaces(query_string);
    });
  }

  getPlaces(query_string) {
    return this.placeService.getPlaces(query_string).subscribe(places => {this.places = places});
  }

  parseInt(string) {
    return parseInt(string);
  }
}
