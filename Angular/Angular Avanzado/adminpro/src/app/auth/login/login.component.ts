import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild ('googleBtn') googleBtn: ElementRef;
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [localStorage.getItem('remember') || false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "39618216965-j1b0vbl6c37od200hks026slihksicn6.apps.googleusercontent.com",
      callback: (response) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential)
      .subscribe( (resp: any) => {
        this.router.navigateByUrl('/');
      });
  }

  login(){
    this.formSubmitted = true;
    if (this.loginForm.valid){
      this.usuarioService.login(this.loginForm.value).subscribe( (resp: any) => {
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
