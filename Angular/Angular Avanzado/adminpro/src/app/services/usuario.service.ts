import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario: Usuario;
  constructor( private http: HttpClient) { }

  logout() {
    localStorage.removeItem('token');
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  validarToken(): Observable<boolean> {
    google.accounts.id.initialize({
      client_id: "39618216965-j1b0vbl6c37od200hks026slihksicn6.apps.googleusercontent.com"
    });

    
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap( (resp: any ) => {
        const { email, google, uid, nombre, role, img } = resp.usuario; 
        this.usuario = new Usuario(nombre, email, uid, '', img, role, google);
        localStorage.setItem('token', resp.token);
      }),
      map( resp => {
        return true;
      }),
      catchError( error => {
        return of(false);
      })
    );
  }

  crearUsuario( formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
          .pipe(
            tap( (resp: any ) => {
              localStorage.setItem('token', resp.token);
            })
          );
  }

  actualizarPefil(data: { email: string, nombre: string, role: string }){
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${ this.uid }`, data ,{
      headers: {
        'x-token': this.token
      }
    });
  }

  login( formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
          .pipe(
            tap( (resp: any ) => {
              localStorage.setItem('token', resp.token);
            })
          );
  }

  loginGoogle( token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
          .pipe(
            tap( (resp: any ) => {
              localStorage.setItem('token', resp.token);
            })
          );
  }

  cargarUsuarios(desde: number = 0){
    return this.http.get(`${base_url}/usuarios/?desde=${ desde }`,{
      headers: {
        'x-token': this.token
      }
    })
    .pipe(
      map( (resp: any) => {
        const usuarios = resp.usuarios.map(
          user => new Usuario(user.nombre, user.email, user.uid, '', user.img, user.role, user.google)
        );
        return {
          total: resp.total,
          usuarios
        }
      })
    );
  }

  eliminarUsuario(usuario: Usuario){
    return this.http.delete(`${base_url}/usuarios/${ usuario.uid }` ,{
      headers: {
        'x-token': this.token
      }
    });
  }

  actualizarUsuario(data: Usuario) {
    return this.http.put(`${base_url}/usuarios/${ data.uid }`, data ,{
      headers: {
        'x-token': this.token
      }
    });
  }
}
