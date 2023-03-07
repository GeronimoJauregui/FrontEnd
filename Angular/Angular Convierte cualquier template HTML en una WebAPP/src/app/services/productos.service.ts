import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoProductoIdx } from '../interfaces/info_productoIdx.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productosCargados = false;
  data_productosIdx: InfoProductoIdx[] = [];
  productosFiltrado: InfoProductoIdx[] = [];
  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos () {
    return new Promise( (resolve, reject) => {
      this.http.get('https://angular-webapp-15962-default-rtdb.firebaseio.com/productos_idx.json').subscribe( (resp: any) => {
        this.data_productosIdx = resp;
        this.productosCargados = true;
        resolve('');
      });
    });
  }

  public getProductos (producto: string){
    return this.http.get(`https://angular-webapp-15962-default-rtdb.firebaseio.com/productos/${producto}.json`);
  }

  public buscarProductos (txtBuscar: string){
    if (this.data_productosIdx.length == 0 ) {
      this.cargarProductos().then( () => {
        this.filtrarProductos(txtBuscar);
      });
    } else {
      this.filtrarProductos(txtBuscar);
    }
  }

  private filtrarProductos(txtBuscar: string) {
    this.productosFiltrado = [];
    txtBuscar = txtBuscar.toLocaleLowerCase();

    this.data_productosIdx.forEach( producto => {
      let categoriaProd = producto.categoria != undefined ? producto.categoria.toLocaleLowerCase() : '';
      let tituloProd = producto.titulo != undefined ? producto.titulo.toLocaleLowerCase() : '';
      
      if( categoriaProd.indexOf(txtBuscar) >= 0 || tituloProd.indexOf(txtBuscar) >= 0 ){
        this.productosFiltrado.push(producto);
      }
    });
  }
}
