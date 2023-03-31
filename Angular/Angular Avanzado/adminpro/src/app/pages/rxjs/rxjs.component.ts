import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

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
