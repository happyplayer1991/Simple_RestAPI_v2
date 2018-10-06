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

  constructor(
    private placeService: PlaceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var query_string = 'locationName=Vancouver&description=City%20of%20Canada&latitude=49.2827&longitude=123.1207';
    this.getPlaces(query_string);
  }

  getPlaces(query_string) {
    return this.placeService.getPlaces(query_string).subscribe(places => {this.places = places});
  }

  parseInt(string) {
    return parseInt(string);
  }
}
