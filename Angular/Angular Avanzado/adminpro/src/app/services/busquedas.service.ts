import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  private transformarUsuarios(resultado: any[]): Usuario[] {
    return resultado.map(
      user => new Usuario(user.nombre, user.email, user.uid, '', user.img, user.role, user.google)
    );
  }

  private transformarHospital(resultado: any[]): Hospital[] {
    return resultado;
  }

  private transformarMedico(resultado: any[]): Medico[] {
    return resultado;
  }
  
  buscar(tipo: 'usuarios'|'medicos'|'hospitales', termino: string){
    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tipo}/${termino}`,this.headers)
    .pipe(
      map( (resp: any) => {
        switch(tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.resultado);
          break;
          case 'hospitales':
            return this.transformarHospital(resp.resultado);
          break;
          case 'medicos':
            return this.transformarMedico(resp.resultado);
          break;
          default:
            return [];
        }
      })
    );
  }
}
