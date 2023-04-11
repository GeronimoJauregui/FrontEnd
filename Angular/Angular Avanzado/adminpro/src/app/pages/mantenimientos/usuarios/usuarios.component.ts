import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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

  eliminarUsuario(usuario: Usuario) {
    if( usuario.uid === this.usuarioServices.usuario.uid){
      Swal.fire('Alerta', `No puede eliminarse a si mismo`, 'warning');
    } else {
      Swal.fire({
        title: 'Borrar usuario?',
        text: `Esta a punto de borrar a ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioServices.eliminarUsuario(usuario).subscribe( (resp: any) => {
            if( resp.ok){
              Swal.fire('Usuario borrado', `${usuario.nombre} fue eliminado correctamente`, 'success');
              this.cargarUsuarios();
            } else {
              Swal.fire('Error', `Error al borrar al usuario`, 'warning');
            }
          }, (err) => {
            Swal.fire('Error', err.error.msg, 'error');
          });
        }
      });
    }
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioServices.actualizarUsuario(usuario).subscribe( (resp:any) => {
      console.log(resp)
    });
  }
}
