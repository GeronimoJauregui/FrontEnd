import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioServices: UsuarioService,
              private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioServices.validarToken()
    .pipe(
      tap( estaAutenticado => {
        if( !estaAutenticado) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usuarioServices.validarToken()
    .pipe(
      tap( estaAutenticado => {
        if( !estaAutenticado) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
  
}
