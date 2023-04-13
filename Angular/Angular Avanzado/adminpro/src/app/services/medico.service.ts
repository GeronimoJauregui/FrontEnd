import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  cargarMedico(){
    return this.http.get(`${base_url}/medicos`, this.headers)
      .pipe(
        map( (resp: {ok: boolean, medicos: Medico[]}) => resp.medicos)
      );
  }

  obtenerMedico(id: string){
    return this.http.get(`${base_url}/medicos/${ id }`, this.headers)
      .pipe(
        map( (resp: {ok: boolean, medico: Medico }) => resp.medico)
      );
  }

  crearMedico(medico: Medico){
    return this.http.post(`${base_url}/medicos`, medico, this.headers);
  }

  actualizarMedico(id: string, medico: Medico){
    return this.http.put(`${base_url}/medicos/${id}`, medico, this.headers);
  }

  eliminarMedico(id: string) {
    return this.http.delete(`${base_url}/medicos/${id}`, this.headers);
  }
}
