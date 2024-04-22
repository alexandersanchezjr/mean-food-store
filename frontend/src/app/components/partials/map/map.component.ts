import { NgIf } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LocationService } from '@services/location.service';
import { Order } from '@shared/models/Order';
import {
  Icon,
  IconOptions,
  LatLng,
  LatLngExpression,
  LatLngTuple,
  Map,
  Marker,
  icon,
  map,
  marker,
  tileLayer,
} from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NgIf],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  private readonly MARKER_ZOOM_LEVEL: number = 12;
  private readonly MARKER_ICON: Icon<IconOptions> = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLNG: LatLngTuple = [3.4516, -76.532];
  private readonly URL_TEMPLATE: string =
    'https://{s}.tile.osm.org/{z}/{x}/{y}.png';

  @ViewChild('map', { static: true })
  mapRef!: ElementRef;

  @Input()
  order!: Order;

  map!: Map;
  currentMarker!: Marker;
  readonly: boolean = false;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    if (this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LATLNG, this.MARKER_ZOOM_LEVEL);

    tileLayer(this.URL_TEMPLATE).addTo(this.map);

    this.map.on('click', (event) => {
      this.setMarker(event.latlng);
    });
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe((latLng) => {
      this.setMarker(latLng);
      this.map.setView(latLng, 17);
    });
  }

  setMarker(latLng: LatLngExpression): void {
    this.addressLatLng = latLng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latLng);
    } else {
      this.currentMarker = marker(latLng, {
        draggable: true,
        icon: this.MARKER_ICON,
      }).addTo(this.map);
    }

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  set addressLatLng(latlng: LatLng){
    if(!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }
}
