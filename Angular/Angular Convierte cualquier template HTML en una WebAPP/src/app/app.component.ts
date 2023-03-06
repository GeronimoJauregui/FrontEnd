import { Component } from '@angular/core';
import { InfoService } from './services/info.service';
import { ProductosService } from './services/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Convierte cualquier template HTML en una WebAPP';

  constructor(
    public productosService: ProductosService){}
}
