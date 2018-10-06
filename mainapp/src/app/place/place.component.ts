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

      // ** get query string from place ** //
      var query_string = this.getQuery(this.data[0]);

      console.log(query_string);
      this.getPlaces(query_string);
    });
    // *** Get all lists *** //
    this.getPlaces('');
  }

  getPlaces(query_string) {
    return this.placeService.getPlaces(query_string).subscribe(places => {this.places = places});
  }

  parseInt(string) {
    return parseInt(string);
  }

  /**
   * Make query from place data
   */
  getQuery(place) {
    var query_string = '';

    if((typeof place.locationName != 'undefined') && (place.locationName != ''))
      query_string += `locationName=${(place.locationName)}`;
    if((typeof place.description != 'undefined') && (place.description != ''))
      query_string += `description=${(place.description)}`;
    if((typeof place.latitude != 'undefined') && (place.latitude != ''))
      query_string += `latitude=${(place.latitude)}`;
    if((typeof place.longitude != 'undefined') && (place.longitude != ''))
      query_string += `longitude=${(place.longitude)}`;

    return query_string;
  }

}
