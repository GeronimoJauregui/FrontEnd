import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  @Input('valor') progreso: number = 10;
  @Input('btnClass') btnClass: string = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  nuevoValor: number = 0;

  ngOnInit(){
    this.btnClass = `btn ${ this.btnClass }`;
  }

  cambiarValor( valor: number) {
    this.progreso = this.progreso + valor;
    if(this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    if(this.progreso <= 0 && valor < 0 ) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.valorSalida.emit(this.progreso);
    return;
  }

  onChange( valor: number){
    this.nuevoValor = valor;
    if(valor >= 100 ){
      this.progreso = 100;
    } else if(valor <= 0){
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }
    this.valorSalida.emit(this.progreso);
  }

}
