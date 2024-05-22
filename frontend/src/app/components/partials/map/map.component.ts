import {isPlatformBrowser, NgIf} from '@angular/common';
import { Component, ElementRef, Input, ViewChild, OnChanges, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { LocationService } from '@services/location.service';
import { Order } from '@shared/models/Order';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [
    NgIf
  ]
})
export class MapComponent implements OnChanges, AfterViewInit {
  private MARKER_ZOOM_LEVEL: number = 12;
  private MARKER_ICON: any;
  private DEFAULT_LATLNG: [number, number] = [3.4516, -76.532];
  private URL_TEMPLATE: string = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png';

  @ViewChild('map', { static: true }) mapRef!: ElementRef;

  @Input() order!: Order;
  @Input() readonly: boolean = false;

  map: any;
  currentMarker: any;

  constructor(private locationService: LocationService, @Inject(PLATFORM_ID) private platformId: any) {}

  async ngOnChanges(): Promise<void> {
    if (!this.order || !isPlatformBrowser(this.platformId)) return;
    await this.initializeMap();

    if (this.readonly && this.addressLatLng) {
      this.showLocationOnReadonlyMode();
    }
  }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      await this.initializeMap();
    }
  }

  async showLocationOnReadonlyMode() {
    if (!this.map) return;
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, 17);

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  async initializeMap() {
    if (this.map || !isPlatformBrowser(this.platformId)) return;

    const leaflet = await import('leaflet');
    this.MARKER_ICON = leaflet.icon({
      iconUrl: 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
      iconSize: [42, 42],
      iconAnchor: [21, 42],
    });

    this.map = leaflet.map(this.mapRef.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LATLNG, this.MARKER_ZOOM_LEVEL);

    leaflet.tileLayer(this.URL_TEMPLATE).addTo(this.map);

    this.map.on('click', (event: any) => {
      this.setMarker(event.latlng);
    });
  }

  async findMyLocation() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.locationService.getCurrentLocation().subscribe((latLng) => {
      this.setMarker(latLng);
      this.map.setView(latLng, 17);
    });
  }

  async setMarker(latLng: any): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const leaflet = await import('leaflet');
    this.addressLatLng = latLng as any;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latLng);
    } else {
      this.currentMarker = leaflet.marker(latLng, {
        draggable: true,
        icon: this.MARKER_ICON,
      }).addTo(this.map);
    }

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    });
  }

  set addressLatLng(latlng: any) {
    if (!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng() {
    return this.order.addressLatLng!;
  }
}
