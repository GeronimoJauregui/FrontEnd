import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  manuItems: any[];
  public imgUrl = '';
  public nameUser = '';
  constructor(private sidebarService : SidebarService,
              private usuarioService: UsuarioService) {
    this.manuItems = this.sidebarService.menu;
    this.imgUrl = usuarioService.usuario.imagenUrl;
    this.nameUser = usuarioService.usuario.nombre;
  }

  ngOnInit(): void {
  }

}
