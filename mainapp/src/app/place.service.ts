import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Place } from './place';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  // *** shared data between 2 components *** //
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();

  private placesUrl = 'http://localhost:8080/api/places';  // URL to web api
  constructor(private http: HttpClient) { 
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  getPlaces (query: string): Observable<Place[]> {
    return this.http.get<Place[]>(this.placesUrl + '?' + query);
  }

  getPlace(location: string): Observable<Place> {
    const url = `${this.placesUrl}/${location}`;
    return this.http.get<Place>(url);
  }

  addPlace (Place: Place): Observable<Place> {
    return this.http.post<Place>(this.placesUrl, Place, httpOptions);
  }

  updatePlace (Place: Place): Observable<any> {
    return this.http.put(this.placesUrl, Place, httpOptions);
  }

  deletePlace (location: string ): Observable<{}> {
    const url = `${this.placesUrl}/${location}`;
    return this.http.delete(url, httpOptions);
  }

  myMethod(data) {
    this.myMethodSubject.next(data);
  }
}
