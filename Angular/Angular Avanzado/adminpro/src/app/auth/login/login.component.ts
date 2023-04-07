import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [localStorage.getItem('remember') || false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService) { }

  login(){
    this.formSubmitted = true;
    if (this.loginForm.valid){
      this.usuarioService.login(this.loginForm.value).subscribe( (resp: any) => { 
        console.log(resp);
        if(resp.ok){
          if(this.loginForm.get('remember').value) {
            localStorage.setItem('email', this.loginForm.get('email').value);
            localStorage.setItem('remember', this.loginForm.get('remember').value);
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('remember');
          }
          this.router.navigateByUrl('/');
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
}
