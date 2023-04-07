import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Geronimo', [ Validators.required, Validators.minLength(3)]],
    email: ['prueba1@gmail.com', [Validators.required, Validators.email]],
    password: ['admin', [Validators.required]],
    confirmPassword: ['admin', [Validators.required]],
    terminos: [true, [Validators.requiredTrue]],
  }, {
    validators: this.passwordsIguales('password', 'confirmPassword')
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService) 
  { }

  crearUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.valid){
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe( (resp: any) => {
        if(resp.ok){
          console.log(resp);
        } else {
          Swal.fire('Error', resp.msg, 'info');
        }
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    } else {
      console.log('Incorrecto');
    }
  }

  campoNoValido( campo: string): boolean {
    if(this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true
    }
    return false;
  }

  passwordDiferentes(): boolean {
    const passw1 = this.registerForm.get('password').value;
    const passw2 = this.registerForm.get('confirmPassword').value;
    if (((passw1 !== passw2) || this.registerForm.get('password').invalid || this.registerForm.get('confirmPassword').invalid)
    && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales( pass1: string, pass2: string ) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }
}
