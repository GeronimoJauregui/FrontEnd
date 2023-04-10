import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  constructor(private usuarioServices: UsuarioService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioServices.cargarUsuarios(this.desde).subscribe( (resp: any) => {
      this.totalUsuarios = resp.total;
      this.usuarios = resp.usuarios;
      this.usuariosTemp = resp.usuarios;
      this.cargando = false;
    })
  }

  cambiarPagina(valor: number){
    this.desde += valor;
    if(this.desde < 0 ){
      this.desde = 0;
    } else if(this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string){
    if( termino.length === 0){
      this.usuarios = this.usuariosTemp;
    } else {
      this.busquedasService.buscar('usuarios', termino).subscribe( (resp: any) => {
        this.usuarios = resp;
      });
    }
  }

}
