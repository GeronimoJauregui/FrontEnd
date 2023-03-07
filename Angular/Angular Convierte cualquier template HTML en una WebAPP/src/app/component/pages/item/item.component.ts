import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoDetalleProducto } from 'src/app/interfaces/info_detalleProducto.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  data_detalleProducto: InfoDetalleProducto = {};
  productoId: string = '';
  constructor( 
    private route: ActivatedRoute,
    private productosService: ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe( parametros => {
      this.productoId = parametros.id;
      this.productosService.getProductos(parametros.id).subscribe( producto => {
        this.data_detalleProducto = producto;
      });
    });
  }

}
