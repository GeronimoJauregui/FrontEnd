import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  @Input('valor') progreso: number = 10;

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

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

}
