import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {
    

    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log(valor),
    //   error => console.warn(error),
    //   () => console.info('termino')
    // );

    this.intervalSubs = this.retornaIntervalo().subscribe(
      (valor) => console.log(valor),
    );
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(500)
    .pipe(
      //Realiza las operaciones en orden de lista
      map( valor => {
        return valor + 1;
      }),
      take(10),
      filter( valor => (valor % 2 === 0) ? true : false),
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
