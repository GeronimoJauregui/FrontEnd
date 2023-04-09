import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
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
  public imagenSubir: File;
  public imgTemp: any = '';
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) 
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

  cargarImagen(file: File) {
    this.imagenSubir = file;

    if(!file) {
      return this.imgTemp = null;
    }

    const reader =  new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then( img => {
        if( img !== false){
          this.usuario.img = img;
        }
      });
  }

}
