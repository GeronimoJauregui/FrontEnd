import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  public imgUrl = '';
  public nameUser = '';
  public emailUser = '';
  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private ngZone: NgZone) { 
    this.imgUrl = usuarioService.usuario.imagenUrl;
    this.emailUser = usuarioService.usuario.email;
    this.nameUser = usuarioService.usuario.nombre;
  }

  logout() {
    this.usuarioService.logout();

    google.accounts.id.revoke( 'geronimo.jauregui@isita.com.mx', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    })
  }
}
