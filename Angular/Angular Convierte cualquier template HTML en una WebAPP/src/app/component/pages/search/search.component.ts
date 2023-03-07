import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  txtBuscar: string = '';
  constructor(
    private route: ActivatedRoute,
    public productosService: ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe( parametros => {
      this.txtBuscar = parametros.txtBuscar;
      this.productosService.buscarProductos(this.txtBuscar);
    });
  }

}
