import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoProductoIdx } from '../interfaces/info_productoIdx.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productosCargados = false;
  data_productosIdx: InfoProductoIdx[] = [];
  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos (){
    this.http.get('https://angular-webapp-15962-default-rtdb.firebaseio.com/productos_idx.json').subscribe( (resp: any) => {
      this.data_productosIdx = resp;
      this.productosCargados = true;
      console.log(this.data_productosIdx);
    });
  }
}
