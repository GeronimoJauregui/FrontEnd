import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    

    this.retornaObservable().pipe(
      retry(1)
    ).subscribe(
      valor => console.log(valor),
      error => console.warn(error),
      () => console.info('termino')
    );

    this.retornaIntervalo().subscribe(
      (valor) => console.log(valor),
    );
  }

  retornaIntervalo(): Observable<number> {
    return interval(1000).pipe(
      take(4),
      map( valor => {
        return valor + 1;
      })
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>( observer => {
      
      const intervalo = setInterval(()=> {
        i++;
        observer.next(i);

        if(i === 4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i === 2 || i === 3){
          clearInterval(intervalo);
          observer.error('se llego a el valor 2');
        }
      }, 1000);
    });
    return obs$;
  }
}
