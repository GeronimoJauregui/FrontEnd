import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  public tipo:  'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo: 'usuarios'|'medicos'|'hospitales', id: string, img?: string){
    console.log(img);
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = '';
    
    if( img !== null && img !== undefined && img.includes('https')){
      return this.img = img;
    }
    if ( img ){
        return this.img = `${base_url}/uploads/${ tipo }/${ img }`;
    } else {
        return this.img =`${base_url}/uploads/${ tipo }/no-image`;
    }
  }
  
  cerrarModal(){
    this._ocultarModal = true;
  }
}
