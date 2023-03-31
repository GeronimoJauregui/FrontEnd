import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    const obs$ = new Observable( observer => {
      let i = -1;
      const intervalo = setInterval(()=> {
        i++;
        observer.next(i);

        if(i === 4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i === 2){
          clearInterval(intervalo);
          observer.error('se llego a el valor 2');
        }
      }, 1000);
    });

    obs$.subscribe(
      valor => console.log(valor),
      error => console.warn(error),
      () => console.info('termino')
    );
  }

}
