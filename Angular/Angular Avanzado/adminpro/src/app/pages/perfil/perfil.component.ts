import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public usuario: Usuario;
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService) 
  { 
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  guardarPerfil() {
    this.usuarioService.actualizarPefil(this.perfilForm.value).subscribe( (resp: any) => {
      if(resp.ok){
        this.usuario.nombre = resp.usuario.nombre;
        this.usuario.email = resp.usuario.email;
      }
    });
  }

}
