import { Component, OnInit } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  places: Place[];

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
     this.getPlaces();
  }

  getPlaces() {
    return this.placeService.getPlaces().subscribe(places => {this.places = places});
  }

  parseInt(string) {
    return parseInt(string);
  }
}
