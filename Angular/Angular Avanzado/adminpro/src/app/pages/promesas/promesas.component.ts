import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise( (resolve) => {
    //   resolve('Hola');
    // });
    // promesa.then( (mensaje) => {
    //   console.log(mensaje)
    // })
    // console.log('init');

    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    });
  }

  getUsuarios(){
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json())
      .then( body => resolve(body.data));
    });
  }


}
