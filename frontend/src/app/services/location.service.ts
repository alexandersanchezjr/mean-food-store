import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getCurrentLocation(): Observable<LatLngLiteral> {
    return new Observable((observer) => {
      if (!window.navigator.geolocation) return;
      return window.navigator.geolocation.getCurrentPosition((position) => {
        observer.next({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
          (error: any) => {
            observer.error(error);
          };
      });
    });
  }
}
