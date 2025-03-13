import { Component } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
  
})
export class MapComponent {
  apiLoaded = false;
  center: google.maps.LatLngLiteral = { lat: 47.49683551616413, lng: 19.053922986507317 }; // Budapest koordinátái
  zoom = 16;
}
