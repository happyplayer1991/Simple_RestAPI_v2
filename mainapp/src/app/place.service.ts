import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from './place';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private placesUrl = 'http://localhost:8080/api/places';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  getPlaces (): Observable<Place[]> {
    return this.http.get<Place[]>(this.placesUrl)
  }

  getPlace(id: number): Observable<Place> {
    const url = `${this.placesUrl}/${id}`;
    return this.http.get<Place>(url);
  }

  addPlace (Place: Place): Observable<Place> {
    return this.http.post<Place>(this.placesUrl, Place, httpOptions);
  }

  deletePlace (Place: Place | number): Observable<Place> {
    const id = typeof Place === 'number' ? Place : Place.id;
    const url = `${this.placesUrl}/${id}`;

    return this.http.delete<Place>(url, httpOptions);
  }

  updatePlace (Place: Place): Observable<any> {
    return this.http.put(this.placesUrl, Place, httpOptions);
  }
}
