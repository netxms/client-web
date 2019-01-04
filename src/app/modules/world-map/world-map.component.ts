import Coordinate from 'ol/coordinate';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import MousePosition from 'ol/control/MousePosition';
import ScaleLine from 'ol/control/ScaleLine';
import ZoomSlider from 'ol/control/ZoomSlider';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-world-map',
   templateUrl: './world-map.component.html',
   styleUrls: [ './world-map.component.css', './ol.css' ]
})
export class WorldMapComponent implements OnInit {
   map: OlMap;
   source: OlXYZ;
   layer: OlTileLayer;
   view: OlView;
   center: Coordinate;
   zoom: number;

   constructor() { }

   ngOnInit() {
      this.source = new OlXYZ({
         url: 'http://tile.osm.org/{z}/{x}/{y}.png'
      });

      this.layer = new OlTileLayer({
         source: this.source
      });

      this.zoom = Number(localStorage.getItem('WorldMap.Zoom')) || 3;
      const x = Number(localStorage.getItem('WorldMap.Center.X')) || 0;
      const y = Number(localStorage.getItem('WorldMap.Center.Y')) || 0;
      this.center = [x, y];
      this.view = new OlView({
         center: this.center,
         zoom: this.zoom
      });

      this.map = new OlMap({
         target: 'map',
         layers: [this.layer],
         view: this.view,
         loadTilesWhileInteracting: true,
         controls: [
            new ZoomSlider(),
            new ScaleLine(),
            new MousePosition()
         ]
      });

      this.map.on('moveend', () => {
         const z = this.view.getZoom();
         if (z !== this.zoom) {
            this.zoom = z;
            localStorage.setItem('WorldMap.Zoom', z);
         }

         const c = this.view.getCenter();
         if ((c[0] !== this.center[0]) || (c[1] !== this.center[1])) {
            this.center = c;
            localStorage.setItem('WorldMap.Center.X', c[0]);
            localStorage.setItem('WorldMap.Center.Y', c[1]);
         }
         return true;
      });
   }
}
