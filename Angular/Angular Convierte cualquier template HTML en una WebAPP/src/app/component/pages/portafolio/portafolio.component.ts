import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss']
})
export class PortafolioComponent implements OnInit {

  constructor(public productosService: ProductosService) { }

  ngOnInit(): void {
  }

}
